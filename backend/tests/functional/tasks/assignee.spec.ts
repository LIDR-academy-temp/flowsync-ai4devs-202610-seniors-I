import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Responsable de las tareas. Cubre los tres scenarios del requisito «Lo que
 * cada tarea muestra de su responsable» de `openspec/specs/tasks/spec.md`.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function tokenDe(
    client: any,
    { fullName, email }: { fullName: string | null; email: string }
  ) {
    await User.create({ fullName, email, password: 'secreto123' })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email, password: 'secreto123' })

    login.assertStatus(200)
    return login.body().data.token as string
  }

  async function crearTarea(client: any, token: string, title: string) {
    const response = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title })

    response.assertStatus(201)
    return response.body().data
  }

  test('una tarea muestra el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const token = await tokenDe(client, {
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
    })

    const task = await crearTarea(client, token, 'Revisar el informe')

    assert.equal(task.assignee.fullName, 'Ada Lovelace')
    assert.equal(task.assignee.initials, 'AL')
  })

  test('el responsable no filtra datos de cuenta ni en una tarea ni en la lista', async ({
    client,
    assert,
  }) => {
    const token = await tokenDe(client, {
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
    })
    const task = await crearTarea(client, token, 'Revisar el informe')

    const individual = await client
      .get(`/api/v1/tasks/${task.id}?today=2026-11-08`)
      .header('Authorization', `Bearer ${token}`)
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    individual.assertStatus(200)
    lista.assertStatus(200)

    const assignees = [individual.body().data.assignee, lista.body().data[0].assignee]
    for (const assignee of assignees) {
      assert.notProperty(assignee, 'email')
      assert.notProperty(assignee, 'password')
      assert.notProperty(assignee, 'accessToken')
    }
  })

  test('un responsable sin nombre conserva sus iniciales sin exponer su email', async ({
    client,
    assert,
  }) => {
    const token = await tokenDe(client, { fullName: null, email: 'sin-nombre@example.com' })

    const task = await crearTarea(client, token, 'Preparar la reunión')

    assert.isNull(task.assignee.fullName)
    assert.equal(task.assignee.initials, 'SE')
    assert.notProperty(task.assignee, 'email')
  })
})
