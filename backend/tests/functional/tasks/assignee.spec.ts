import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * Cada scenario se comprueba por las dos vías por las que se obtiene una tarea:
 * suelta (`GET /api/v1/tasks/:id`) y dentro de la lista (`GET /api/v1/tasks`).
 * La tarea se crea en `pending` para que salga en la lista sin filtro.
 *
 * Mismo aislamiento que los tests de auth: transacción global, porque la suite
 * comparte el fichero SQLite con el servidor de desarrollo.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  // `GET /tasks/:id` exige el día de quien mira; su valor no afecta a estos scenarios.
  const HOY = '2026-11-08'

  async function tokenDe(client: any, email: string) {
    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    return response.body().data.token as string
  }

  async function tareaDe(fullName: string | null, email: string) {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })
    return Task.create({ title: 'Revisar el informe', status: 'pending', assigneeId: responsable.id })
  }

  /** El `assignee` de la tarea, obtenida suelta y dentro de la lista. */
  async function assigneesDe(client: any, assert: any, tarea: Task, token: string) {
    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)
    const enLista = lista.body().data.find((t: { id: number }) => t.id === tarea.id)
    assert.exists(enLista, 'la tarea tiene que aparecer en la lista')

    return { suelta: suelta.body().data.assignee, enLista: enLista.assignee }
  }

  test('el responsable se identifica por su nombre y sus iniciales', async ({ client, assert }) => {
    const tarea = await tareaDe('Ada Lovelace', 'ada@example.com')
    const token = await tokenDe(client, 'ada@example.com')

    const { suelta, enLista } = await assigneesDe(client, assert, tarea, token)

    for (const assignee of [suelta, enLista]) {
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('el responsable no expone su email ni datos de acceso', async ({ client, assert }) => {
    const tarea = await tareaDe('Ada Lovelace', 'ada@example.com')
    const token = await tokenDe(client, 'ada@example.com')

    const { suelta, enLista } = await assigneesDe(client, assert, tarea, token)

    for (const assignee of [suelta, enLista]) {
      assert.notProperty(assignee, 'email')
      assert.notProperty(assignee, 'password')
      // Tampoco el valor, por si saliera bajo otra clave.
      assert.notInclude(JSON.stringify(assignee), 'ada@example.com')
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const tarea = await tareaDe(null, 'sin-nombre@example.com')
    const token = await tokenDe(client, 'sin-nombre@example.com')

    const { suelta, enLista } = await assigneesDe(client, assert, tarea, token)

    for (const assignee of [suelta, enLista]) {
      assert.property(assignee, 'fullName')
      assert.isNull(assignee.fullName)
      // El scenario no fija qué iniciales: solo que siguen llegando.
      assert.isString(assignee.initials)
      assert.isNotEmpty(assignee.initials)
    }
  })
})
