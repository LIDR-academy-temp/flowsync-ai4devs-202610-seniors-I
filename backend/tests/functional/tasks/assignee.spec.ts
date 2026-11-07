import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito del mismo nombre de `openspec/specs/tasks/spec.md`.
 *
 * Cada test obtiene la tarea por las dos lecturas de la API, la lista y la tarea
 * suelta, y lo hace con otra cuenta: lo que importa es qué ven los demás de ese
 * responsable.
 */
test.group('Tareas | lo que muestra de su responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function tareaDe(fullName: string | null) {
    const responsable = await User.create({
      fullName,
      email: 'ada@example.com',
      password: 'secreto123',
    })

    return Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })
  }

  async function responsableVisto(client: any, tarea: Task) {
    await User.create({
      fullName: 'Alan Turing',
      email: 'alan@example.com',
      password: 'secreto123',
    })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'alan@example.com', password: 'secreto123' })
    const token = login.body().data.token

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)

    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: '2026-08-13' })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    return {
      lista: lista.body().data.find((fila: { id: number }) => fila.id === tarea.id).assignee,
      suelta: suelta.body().data.assignee,
    }
  }

  test('el responsable se identifica por su nombre y sus iniciales', async ({ client, assert }) => {
    const tarea = await tareaDe('Ada Lovelace')

    const { lista, suelta } = await responsableVisto(client, tarea)

    for (const assignee of [lista, suelta]) {
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('la tarea no filtra el email ni los datos de acceso de su responsable', async ({
    client,
    assert,
  }) => {
    const tarea = await tareaDe('Ada Lovelace')

    const vistas = await responsableVisto(client, tarea)

    // Se recogen las dos lecturas antes de afirmar: la primera que falle no debe
    // ocultar lo que hace la otra.
    const conDatosDeAcceso = Object.entries(vistas)
      .filter(([, assignee]) => {
        const json = JSON.stringify(assignee)
        return ['email', 'ada@example.com', 'password', 'token'].some((dato) => json.includes(dato))
      })
      .map(([lectura]) => lectura)

    assert.deepEqual(conDatosDeAcceso, [])
  })

  test('un responsable sin nombre llega con el nombre nulo y sus iniciales', async ({
    client,
    assert,
  }) => {
    const tarea = await tareaDe(null)

    const { lista, suelta } = await responsableVisto(client, tarea)

    for (const assignee of [lista, suelta]) {
      assert.isNull(assignee.fullName)
      assert.equal(assignee.initials, 'AE')
    }
  })
})
