import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 */

// Día de referencia fijo: `GET /tasks/:id` exige `today` y no debe depender del reloj.
const HOY = '2026-11-07'

// Lo justo para identificar al responsable en la lista, según el requisito.
const CLAVES_PERMITIDAS = ['id', 'fullName', 'initials']

test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  async function cuenta(client: any, fullName: string | null, email: string) {
    const user = await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    response.assertStatus(200)

    return { user, token: response.body().data.token as string }
  }

  function tareaDe(user: User) {
    return Task.create({ title: 'Preparar la demo', status: 'pending', assigneeId: user.id })
  }

  test('una tarea trae el nombre y las iniciales de su responsable', async ({ client, assert }) => {
    const { user, token } = await cuenta(client, 'Ada Lovelace', 'ada@example.com')
    const tarea = await tareaDe(user)

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('ni la lista ni la tarea suelta exponen el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { user, token } = await cuenta(client, 'Ada Lovelace', 'ada@example.com')
    const tarea = await tareaDe(user)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)

    const enLista = lista.body().data.find((t: any) => t.id === tarea.id)
    assert.isDefined(enLista)
    assert.deepEqual(
      Object.keys(enLista.assignee).filter((k) => !CLAVES_PERMITIDAS.includes(k)),
      []
    )
    assert.notInclude(JSON.stringify(enLista.assignee), 'ada@example.com')

    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    assert.deepEqual(
      Object.keys(suelta.body().data.assignee).filter((k) => !CLAVES_PERMITIDAS.includes(k)),
      []
    )
    assert.notInclude(JSON.stringify(suelta.body().data.assignee), 'ada@example.com')
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales, sin email', async ({
    client,
    assert,
  }) => {
    const { user, token } = await cuenta(client, null, 'sin-nombre@example.com')
    const tarea = await tareaDe(user)

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}?today=${HOY}`)
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'SE')
    assert.notInclude(JSON.stringify(assignee), 'sin-nombre@example.com')
  })
})
