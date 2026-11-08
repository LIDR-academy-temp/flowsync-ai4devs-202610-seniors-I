import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Cubre los scenarios «Responsable identificable» y «La tarea no filtra datos
 * de cuenta» del requisito «Lo que cada tarea muestra de su responsable»
 * (`openspec/specs/tasks/spec.md`). Cada scenario se comprueba por las dos
 * lecturas que nombra la spec: la tarea dentro de la lista y la tarea suelta.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const PASSWORD = 'secreto123'
  const HOY = '2026-01-15'

  async function crearCuenta(email: string, fullName: string | null) {
    return User.create({ fullName, email, password: PASSWORD })
  }

  async function abrirSesion(client: any, email: string) {
    const response = await client.post('/api/v1/auth/login').json({ email, password: PASSWORD })
    return response.body().data.token as string
  }

  /** Una tarea a nombre de `responsable`, vista por una cuenta distinta. */
  async function escenario(client: any, fullName: string | null) {
    const responsable = await crearCuenta('responsable@example.com', fullName)
    await crearCuenta('mirona@example.com', 'Grace Hopper')
    const tarea = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })
    const token = await abrirSesion(client, 'mirona@example.com')

    return { responsable, tarea, token }
  }

  async function asigneeEnLista(client: any, token: string, tareaId: number) {
    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    return response.body().data.find((t: any) => t.id === tareaId)?.assignee
  }

  async function asigneeEnDetalle(client: any, token: string, tareaId: number) {
    const response = await client
      .get(`/api/v1/tasks/${tareaId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    return response.body().data.assignee
  }

  test('en la lista, el assignee trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { tarea, token } = await escenario(client, 'Ada Lovelace')

    const assignee = await asigneeEnLista(client, token, tarea.id)

    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('en la tarea suelta, el assignee trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { tarea, token } = await escenario(client, 'Ada Lovelace')

    const assignee = await asigneeEnDetalle(client, token, tarea.id)

    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  const DATOS_DE_CUENTA = ['id', 'email', 'password', 'createdAt', 'updatedAt']

  test('en la lista, el assignee no incluye el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { responsable, tarea, token } = await escenario(client, 'Ada Lovelace')

    const assignee = await asigneeEnLista(client, token, tarea.id)

    for (const campo of DATOS_DE_CUENTA) {
      assert.notProperty(assignee, campo)
    }
    assert.notInclude(JSON.stringify(assignee), responsable.email)
  })

  test('en la tarea suelta, el assignee no incluye el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { responsable, tarea, token } = await escenario(client, 'Ada Lovelace')

    const assignee = await asigneeEnDetalle(client, token, tarea.id)

    for (const campo of DATOS_DE_CUENTA) {
      assert.notProperty(assignee, campo)
    }
    assert.notInclude(JSON.stringify(assignee), responsable.email)
  })
})
