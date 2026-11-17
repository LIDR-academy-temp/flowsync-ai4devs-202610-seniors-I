import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea que no
 * filtra datos de cuenta (suelta y dentro de la lista) y el responsable que se
 * registró sin nombre.
 *
 * Mismo aislamiento que la suite de auth: transacción global y no truncate,
 * porque la suite functional comparte fichero SQLite con el servidor de
 * desarrollo.
 */
test.group('Tareas | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  /**
   * Crea la cuenta y su tarea directamente en base de datos, e inicia sesión
   * por el endpoint real para obtener un token válido (como en auth/session).
   */
  async function tareaDe(fullName: string | null, email = 'ada@example.com') {
    const user = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({
      title: 'Escribir el motor analítico',
      status: 'pending',
      assigneeId: user.id,
    })

    return { user, task }
  }

  async function token(client: any, email = 'ada@example.com') {
    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  // `GET /tasks/:id` exige `today` (día de quien mira) por query string.
  const HOY = '2026-01-15'

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const { task } = await tareaDe('Ada Lovelace')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${await token(client)}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la tarea no filtra el email ni datos de acceso del responsable', async ({
    client,
    assert,
  }) => {
    const { task } = await tareaDe('Ada Lovelace')
    const bearer = `Bearer ${await token(client)}`

    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', bearer)
    const lista = await client.get('/api/v1/tasks').header('Authorization', bearer)

    suelta.assertStatus(200)
    lista.assertStatus(200)

    const asignados = [
      suelta.body().data.assignee,
      ...lista.body().data.map((t: { assignee: object }) => t.assignee),
    ]
    assert.lengthOf(asignados, 2)

    for (const assignee of asignados) {
      // Por clave: ningún campo de acceso o de cuenta.
      for (const clave of ['email', 'password', 'rememberMeToken', 'token']) {
        assert.notProperty(assignee, clave)
      }

      // Por valor: ni el email ni la contraseña aparecen con otro nombre de clave.
      const serializado = JSON.stringify(assignee)
      assert.notInclude(serializado, 'ada@example.com')
      assert.notInclude(serializado, 'secreto123')
    }
  })

  test('un responsable sin nombre llega con nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const { task } = await tareaDe(null)

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${await token(client)}`)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.isString(assignee.initials)
    assert.isNotEmpty(assignee.initials)
  })
})
