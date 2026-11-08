import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que una tarea enseña de quien la lleva. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: el responsable identificable, que la tarea
 * no filtre datos de la cuenta y el responsable sin nombre.
 *
 * Cada scenario se comprueba en las dos formas de obtener una tarea: dentro
 * de la lista y suelta. Si cualquiera de las dos enseña algo de más, el
 * requisito no se cumple.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return { user, token: response.body().data.token as string }
  }

  async function responsables(client: any, token: string, taskId: number) {
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)

    const suelta = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: '2026-11-08' })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    const enLista = lista.body().data.find((task: { id: number }) => task.id === taskId)

    return { enLista: enLista.assignee, suelta: suelta.body().data.assignee }
  }

  test('la tarea trae el nombre y las iniciales de su responsable', async ({ client, assert }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({ title: 'Revisar el informe', assigneeId: user.id })

    const { enLista, suelta } = await responsables(client, token, task.id)

    for (const assignee of [enLista, suelta]) {
      assert.equal(assignee.id, user.id)
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('el responsable de una tarea no incluye el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({ title: 'Revisar el informe', assigneeId: user.id })

    const { enLista, suelta } = await responsables(client, token, task.id)

    // Se compara el conjunto exacto de claves y no solo la ausencia del email:
    // cualquier dato de cuenta que se cuele, sea cual sea, rompe el requisito.
    for (const assignee of [enLista, suelta]) {
      assert.notProperty(assignee, 'email')
      assert.sameMembers(Object.keys(assignee), ['id', 'fullName', 'initials'])
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con sus iniciales', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, null, 'sin-nombre@example.com')
    const task = await Task.create({ title: 'Revisar el informe', assigneeId: user.id })

    const { enLista, suelta } = await responsables(client, token, task.id)

    for (const assignee of [enLista, suelta]) {
      assert.isNull(assignee.fullName)
      assert.equal(assignee.initials, 'SE')
    }
  })
})
