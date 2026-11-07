import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, que la tarea no
 * filtre datos de cuenta (suelta y dentro de la lista) y responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function sesion(client: any, fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return { user, token: response.body().data.token as string }
  }

  test('el assignee de una tarea trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({ title: 'Revisar', status: 'pending', assigneeId: user.id })

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-07' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('el assignee no expone el email ni datos de acceso, ni suelto ni en la lista', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const task = await Task.create({ title: 'Revisar', status: 'pending', assigneeId: user.id })

    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-07' })
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)

    const enLista = lista.body().data.find((t: { id: number }) => t.id === task.id)
    assert.exists(enLista, 'la tarea creada tiene que aparecer en la lista')

    // El scenario pide las DOS lecturas: si una de ellas filtra, el requisito
    // no se cumple aunque la otra esté limpia.
    for (const [lectura, assignee] of [
      ['tarea suelta', suelta.body().data.assignee],
      ['tarea en la lista', enLista.assignee],
    ] as const) {
      const serialized = JSON.stringify(assignee)
      assert.notProperty(assignee, 'email', `${lectura}: el assignee incluye email`)
      assert.notInclude(serialized, 'ada@example.com', `${lectura}: el assignee filtra el email`)
      assert.notInclude(serialized, 'password', `${lectura}: el assignee filtra la contraseña`)
      assert.notInclude(serialized, 'secreto123', `${lectura}: el assignee filtra la contraseña`)
      assert.notInclude(serialized, token, `${lectura}: el assignee filtra el token`)
    }
  })

  test('un responsable sin nombre llega con fullName nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { user, token } = await sesion(client, null, 'sin-nombre@example.com')
    const task = await Task.create({ title: 'Revisar', status: 'pending', assigneeId: user.id })

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: '2026-11-07' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.isString(assignee.initials)
    assert.isNotEmpty(assignee.initials)
  })
})
