import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, email: string) {
    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  async function tareaDe(fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({ title: 'Preparar la demo', status: 'pending', assigneeId: user.id })

    return { user, task }
  }

  test('el responsable de la tarea trae su nombre y sus iniciales', async ({ client, assert }) => {
    await tareaDe('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'ada@example.com')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const [tarea] = response.body().data
    assert.equal(tarea.assignee.fullName, 'Ada Lovelace')
    assert.equal(tarea.assignee.initials, 'AL')
  })

  test('la tarea no expone el email ni otros datos de la cuenta del responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await tareaDe('Ada Lovelace', 'ada@example.com')
    const token = await sesion(client, 'ada@example.com')

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-09' })
      .header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    suelta.assertStatus(200)

    for (const assignee of [lista.body().data[0].assignee, suelta.body().data.assignee]) {
      assert.notProperty(assignee, 'email')
      assert.notProperty(assignee, 'createdAt')
      assert.notProperty(assignee, 'updatedAt')
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    await tareaDe(null, 'ada@example.com')
    const token = await sesion(client, 'ada@example.com')

    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const [tarea] = response.body().data
    assert.isNull(tarea.assignee.fullName)
    assert.equal(tarea.assignee.initials, 'AE')
  })
})
