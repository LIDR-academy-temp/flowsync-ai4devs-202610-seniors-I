import Task from '#models/task'
import User from '#models/user'
import testUtils from '@adonisjs/core/services/test_utils'
import { test } from '@japa/runner'

const tasksUrl = '/api/v1/tasks'
const referenceDay = '2026-11-16'

async function tareaConResponsable(fullName: string | null) {
  const user = await User.create({ fullName, email: 'ada@example.com', password: 'secreto123' })
  const task = await Task.create({
    title: 'Revisar el informe',
    status: 'pending',
    assigneeId: user.id,
  })
  const token = await User.accessTokens.create(user)

  return { task, authorization: `Bearer ${token.value!.release()}` }
}

test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('una tarea muestra el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { task, authorization } = await tareaConResponsable('Ada Lovelace')

    const response = await client
      .get(`${tasksUrl}/${task.id}`)
      .qs({ today: referenceDay })
      .header('Authorization', authorization)

    response.assertStatus(200)
    assert.equal(response.body().data.assignee.fullName, 'Ada Lovelace')
    assert.equal(response.body().data.assignee.initials, 'AL')
  })

  test('el detalle y el listado solo muestran el nombre y las iniciales de la cuenta', async ({
    client,
    assert,
  }) => {
    const { task, authorization } = await tareaConResponsable('Ada Lovelace')

    const detail = await client
      .get(`${tasksUrl}/${task.id}`)
      .qs({ today: referenceDay })
      .header('Authorization', authorization)
    const list = await client.get(tasksUrl).header('Authorization', authorization)

    detail.assertStatus(200)
    list.assertStatus(200)
    const listedTasks = list.body().data
    if (!Array.isArray(listedTasks)) {
      throw new Error('Se esperaba un listado de tareas')
    }
    const listedTask = listedTasks.find(({ id }) => id === task.id)
    assert.isDefined(listedTask, 'La tarea de la prueba debe aparecer en el listado')

    assert.deepEqual(
      {
        detalle: Object.keys(detail.body().data.assignee).sort(),
        listado: Object.keys(listedTask?.assignee ?? {}).sort(),
      },
      { detalle: ['fullName', 'initials'], listado: ['fullName', 'initials'] }
    )
  })

  test('el responsable sin nombre conserva sus iniciales', async ({ client, assert }) => {
    const { task, authorization } = await tareaConResponsable(null)

    const response = await client
      .get(`${tasksUrl}/${task.id}`)
      .qs({ today: referenceDay })
      .header('Authorization', authorization)

    response.assertStatus(200)
    const { fullName, initials } = response.body().data.assignee
    assert.isNull(fullName)
    assert.isString(initials)
    assert.isNotEmpty(initials.trim())
  })
})
