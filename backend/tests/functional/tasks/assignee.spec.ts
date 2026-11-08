import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Un test por scenario del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return { user, token: response.body().data.token as string }
  }

  test('el responsable de una tarea trae su nombre y sus iniciales', async ({ client, assert }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-08' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('ni la tarea suelta ni la lista exponen el email ni datos de acceso del responsable', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-08' })
      .header('Authorization', `Bearer ${token}`)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    lista.assertStatus(200)

    const enLista = lista.body().data.find((t: { id: number }) => t.id === task.id)
    assert.exists(enLista)

    // El scenario dice «suelta o dentro de la lista»: se comprueban las dos.
    for (const assignee of [suelta.body().data.assignee, enLista.assignee]) {
      const serialized = JSON.stringify(assignee)
      assert.notProperty(assignee, 'email')
      assert.notInclude(serialized, 'ada@example.com')
      assert.notInclude(serialized, 'password')
      assert.notInclude(serialized, 'secreto123')
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, null, 'sin-nombre@example.com')
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-08' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.isString(assignee.initials)
    assert.isNotEmpty(assignee.initials)
  })
})
