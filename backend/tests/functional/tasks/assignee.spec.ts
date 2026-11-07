import User from '#models/user'
import { DateTime } from 'luxon'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta y responsable sin nombre.
 *
 * «Obtener una tarea» se comprueba en las tres lecturas que devuelven una, cada
 * una en su propio test para que un fallo en una no oculte las demás: la
 * creación (`POST /tasks`), la tarea suelta (`GET /tasks/:id`) y la lista
 * (`GET /tasks`).
 *
 * La tarea suelta y la lista se leen con la sesión de OTRA cuenta: hoy una
 * tarea nace a nombre de quien la crea, así que si lee su dueño no se revela
 * nada a nadie, pero la spec no lo limita al dueño y la lista es compartida.
 * La creación solo la puede leer quien crea.
 *
 * El `id` del responsable se tolera: la spec no lo prohíbe de forma explícita.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  // `GET /tasks/:id` exige el día de quien mira; su valor no afecta al responsable.
  const HOY = DateTime.now().toFormat('yyyy-MM-dd')

  const LECTURAS = ['al crearla', 'suelta', 'en la lista'] as const
  type Lectura = (typeof LECTURAS)[number]

  async function sesion(client: any, fullName: string | null, email: string) {
    await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  /**
   * Crea una tarea con el token del responsable y devuelve su `assignee` tal
   * como llega en la lectura pedida. La suelta y la lista las lee otra cuenta.
   */
  async function assigneeAl(client: any, lectura: Lectura, responsable: string) {
    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${responsable}`)
      .json({ title: 'Revisar el informe' })
    creada.assertStatus(201)

    if (lectura === 'al crearla') return creada.body().data.assignee

    const id = creada.body().data.id
    const otra = await sesion(client, 'Alan Turing', 'alan@example.com')

    if (lectura === 'suelta') {
      const suelta = await client
        .get(`/api/v1/tasks/${id}`)
        .header('Authorization', `Bearer ${otra}`)
        .qs({ today: HOY })
      suelta.assertStatus(200)
      return suelta.body().data.assignee
    }

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${otra}`)
    lista.assertStatus(200)
    return lista.body().data.find((task: { id: number }) => task.id === id)?.assignee
  }

  for (const lectura of LECTURAS) {
    test(`el responsable de una tarea trae su nombre y sus iniciales (${lectura})`, async ({
      client,
      assert,
    }) => {
      const token = await sesion(client, 'Ada Lovelace', 'ada@example.com')
      const assignee = await assigneeAl(client, lectura, token)

      assert.isObject(assignee)
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    })

    test(`la tarea no expone el email ni datos de acceso de su responsable (${lectura})`, async ({
      client,
      assert,
    }) => {
      const token = await sesion(client, 'Ada Lovelace', 'ada@example.com')
      const assignee = await assigneeAl(client, lectura, token)

      assert.isObject(assignee)
      assert.notProperty(assignee, 'email')
      assert.notProperty(assignee, 'password')

      // El email tampoco puede colarse bajo otra clave.
      const serialized = JSON.stringify(assignee)
      assert.notInclude(serialized, 'ada@example.com')
      assert.notInclude(serialized, 'secreto123')
      assert.notInclude(serialized, token)
    })

    // Mismo scenario: el requisito prohíbe «ningún otro dato de esa cuenta», y
    // las fechas de alta y modificación de la cuenta lo son. Va en un test
    // aparte para que su resultado no quede tapado por el del email.
    test(`la tarea no expone las fechas de la cuenta de su responsable (${lectura})`, async ({
      client,
      assert,
    }) => {
      const token = await sesion(client, 'Ada Lovelace', 'ada@example.com')
      const assignee = await assigneeAl(client, lectura, token)

      assert.isObject(assignee)
      assert.notProperty(assignee, 'createdAt')
      assert.notProperty(assignee, 'updatedAt')
    })

    test(`un responsable sin nombre llega con nombre nulo y con iniciales (${lectura})`, async ({
      client,
      assert,
    }) => {
      const token = await sesion(client, null, 'ada@example.com')
      const assignee = await assigneeAl(client, lectura, token)

      assert.isObject(assignee)
      assert.property(assignee, 'fullName')
      assert.isNull(assignee.fullName)

      // El valor no se fija: el scenario solo exige que lleguen.
      assert.isString(assignee.initials)
      assert.isNotEmpty(assignee.initials)
    })
  }
})
