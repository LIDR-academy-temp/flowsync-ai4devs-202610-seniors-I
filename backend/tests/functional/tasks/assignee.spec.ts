import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: identificable por nombre e iniciales, sin
 * filtrar datos de cuenta, y sin nombre.
 *
 * La tarea suelta exige el día de referencia (`today`): es la única lectura que
 * informa del vencimiento. Aquí el día da igual — estas tareas no tienen fecha —
 * pero el validador lo pide igual, así que se manda uno válido.
 */
test.group('Tasks | responsable de la tarea', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-16'

  async function cuenta(client: any, fullName: string | null = 'Ada Lovelace') {
    await User.create({ fullName, email: 'ada@example.com', password: 'secreto123' })

    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: 'ada@example.com', password: 'secreto123' })

    return response.body().data.token as string
  }

  async function crearTarea(client: any, token: string) {
    const response = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    response.assertStatus(201)
    return response.body().data.id as number
  }

  test('el responsable de una tarea es identificable por su nombre y sus iniciales', async ({
    client,
    assert,
  }) => {
    const token = await cuenta(client)
    const tareaId = await crearTarea(client, token)

    const response = await client
      .get(`/api/v1/tasks/${tareaId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: HOY })

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('el assignee de una tarea no incluye el email ni datos de acceso de la cuenta', async ({
    client,
    assert,
  }) => {
    const token = await cuenta(client)
    const tareaId = await crearTarea(client, token)

    // El scenario cubre cualquier tarea: la suelta y la que va dentro de la
    // lista. Las dos tienen que callar lo mismo.
    const suelta = await client
      .get(`/api/v1/tasks/${tareaId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: HOY })

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    lista.assertStatus(200)

    const fila = lista.body().data.find((tarea: { id: number }) => tarea.id === tareaId)
    assert.isDefined(fila)

    for (const tarea of [suelta.body().data, fila]) {
      assert.notProperty(tarea.assignee, 'email')
      assert.notInclude(JSON.stringify(tarea), 'ada@example.com')
    }
  })

  test('el responsable sin nombre llega nulo y sus iniciales siguen llegando', async ({
    client,
    assert,
  }) => {
    const token = await cuenta(client, null)
    const tareaId = await crearTarea(client, token)

    const response = await client
      .get(`/api/v1/tasks/${tareaId}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today: HOY })

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
  })
})
