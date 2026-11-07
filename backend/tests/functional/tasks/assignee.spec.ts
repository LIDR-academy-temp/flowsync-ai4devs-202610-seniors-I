import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: el responsable se identifica por nombre e
 * iniciales, la tarea no filtra datos de cuenta (ni suelta ni en lista), y un
 * responsable sin nombre llega con `fullName` nulo pero con iniciales.
 *
 * El día de referencia que `GET /tasks/:id` exige (`today`) lo fija el test: el
 * scenario no habla de vencimiento, así que vale cualquier día válido.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-01-01'

  async function sesion(client: any, fullName: string | null, email: string) {
    await User.create({ fullName, email, password: 'secreto123' })
    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    return response.body().data.token as string
  }

  async function crearTarea(client: any, token: string, title = 'Revisar el informe') {
    const response = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title })
    return response.body().data
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const token = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const creada = await crearTarea(client, token)

    const response = await client
      .get(`/api/v1/tasks/${creada.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    const assignee = response.body().data.assignee
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la tarea no filtra el email del responsable, ni suelta ni en lista', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, 'Ada Lovelace', 'ada@example.com')
    const creada = await crearTarea(client, token)

    // Suelta.
    const suelta = await client
      .get(`/api/v1/tasks/${creada.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)
    assert.notProperty(suelta.body().data.assignee, 'email')

    // Dentro de la lista.
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)
    const enLista = lista.body().data.find((t: any) => t.id === creada.id)
    assert.notProperty(enLista.assignee, 'email')
  })

  test('un responsable sin nombre llega con fullName nulo pero con iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, null, 'ada@example.com')
    const creada = await crearTarea(client, token)

    const response = await client
      .get(`/api/v1/tasks/${creada.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    const assignee = response.body().data.assignee
    assert.isNull(assignee.fullName)
    assert.isNotEmpty(assignee.initials)
  })
})
