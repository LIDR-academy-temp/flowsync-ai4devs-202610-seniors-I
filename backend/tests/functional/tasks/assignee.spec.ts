import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable (nombre e
 * iniciales), la tarea no filtra datos de cuenta (sin email, ni suelta ni en
 * la lista) y responsable sin nombre (nombre nulo, iniciales presentes).
 *
 * El estilo sigue a `tests/functional/auth/`: grupo con transacción global por
 * test, y los datos se montan creando la cuenta y entrando con ella.
 */
test.group('Tasks | responsable de la tarea', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-08'

  /**
   * Crea una cuenta, entra con ella y apunta una tarea a su nombre. Devuelve el
   * token y el id de la tarea recién creada, que nace a nombre de quien la crea.
   */
  async function tareaDe(
    client: any,
    fullName: string | null,
    email = 'ada@example.com'
  ): Promise<{ token: string; taskId: number }> {
    await User.create({ fullName, email, password: 'secreto123' })

    const login = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    const token = login.body().data.token as string

    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    return { token, taskId: creada.body().data.id as number }
  }

  test('el responsable de la tarea llega con nombre e iniciales', async ({ client, assert }) => {
    const { token, taskId } = await tareaDe(client, 'Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('el assignee no incluye el email ni suelta ni dentro de la lista', async ({
    client,
    assert,
  }) => {
    const { token, taskId } = await tareaDe(client, 'Ada Lovelace')

    // Suelta: GET /api/v1/tasks/:id
    const suelta = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    assert.notProperty(suelta.body().data.assignee, 'email')

    // Dentro de la lista: GET /api/v1/tasks
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    const enLista = lista.body().data.find((t: any) => t.id === taskId)
    assert.isDefined(enLista, 'la tarea recién creada debería aparecer en la lista')
    assert.notProperty(enLista.assignee, 'email')
  })

  test('un responsable sin nombre llega con nombre nulo pero con iniciales', async ({
    client,
    assert,
  }) => {
    const { token, taskId } = await tareaDe(client, null, 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.isNull(assignee.fullName)
    assert.isNotEmpty(assignee.initials)
  })
})
