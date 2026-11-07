import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * «Se obtiene una tarea» se lee en sus dos formas de lectura: suelta
 * (`GET /tasks/:id`) y dentro de la lista (`GET /tasks`). Cada test mira las dos.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-07'

  async function tareaDe(client: any, fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: user.id,
    })

    const login = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    const token = login.body().data.token as string

    return { task, token }
  }

  async function leerAssignee(client: any, task: Task, token: string) {
    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)
    const enLista = lista.body().data.find((t: { id: number }) => t.id === task.id)

    return { suelta: suelta.body().data.assignee, enLista: enLista?.assignee }
  }

  test('el responsable se identifica por su nombre y sus iniciales', async ({ client, assert }) => {
    const { task, token } = await tareaDe(client, 'Ada Lovelace', 'ada@example.com')

    const { suelta, enLista } = await leerAssignee(client, task, token)

    for (const assignee of [suelta, enLista]) {
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('el responsable de una tarea no expone su email ni datos de acceso', async ({
    client,
    assert,
  }) => {
    const { task, token } = await tareaDe(client, 'Ada Lovelace', 'ada@example.com')

    const { suelta, enLista } = await leerAssignee(client, task, token)

    for (const [donde, assignee] of [
      ['suelta', suelta],
      ['en la lista', enLista],
    ] as const) {
      assert.notProperty(assignee, 'email', `la tarea ${donde} trae el email del responsable`)
      assert.notProperty(assignee, 'password', `la tarea ${donde} trae la contraseña`)
      assert.notInclude(
        JSON.stringify(assignee),
        'ada@example.com',
        `el email aparece en el assignee de la tarea ${donde}`
      )
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { task, token } = await tareaDe(client, null, 'ada@example.com')

    const { suelta, enLista } = await leerAssignee(client, task, token)

    for (const assignee of [suelta, enLista]) {
      assert.property(assignee, 'fullName')
      assert.isNull(assignee.fullName)
      assert.equal(assignee.initials, 'AE')
    }
  })
})
