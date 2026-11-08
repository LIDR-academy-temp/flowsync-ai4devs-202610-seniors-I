import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: el responsable se identifica por nombre e
 * iniciales, la tarea no filtra el email ni otros datos de acceso de esa
 * cuenta, y un responsable sin nombre sigue llegando con sus iniciales.
 *
 * «Se obtiene una tarea» se comprueba en todas las respuestas que devuelven
 * una: la lista, la tarea suelta, la creación, el cambio de estado y el cambio
 * de fecha. El requisito habla de la tarea, no de un endpoint concreto.
 *
 * Decisión de cobertura: «dato de acceso» es cualquier campo del responsable
 * que no sea `id`, `fullName` o `initials`.
 */

const HOY = '2026-11-08'
const PERMITIDOS = ['id', 'fullName', 'initials']

/**
 * Las respuestas que devuelven una tarea ya existente, cada una como una
 * función que la obtiene y devuelve su `assignee`. La creación va aparte,
 * porque no puede obtener una tarea de otra persona: nace a nombre de quien la
 * crea.
 *
 * El cliente va sin los tipos del registro a propósito: los tipos generados se
 * infieren de los transformers y ya declaran el email en el `assignee`, y aquí
 * se comprueba lo que llega, no lo declarado.
 */
const LECTURAS: Record<string, (api: any, token: string, id: number) => Promise<any>> = {
  'GET /tasks': async (api, token, id) => {
    const response = await api.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    return response.body().data.find((t: any) => t.id === id).assignee
  },
  'GET /tasks/:id': async (api, token, id) => {
    const response = await api
      .get(`/api/v1/tasks/${id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    return response.body().data.assignee
  },
  'PATCH /tasks/:id/status': async (api, token, id) => {
    const response = await api
      .patch(`/api/v1/tasks/${id}/status`)
      .header('Authorization', `Bearer ${token}`)
      .json({ status: 'in_progress' })
    response.assertStatus(200)
    return response.body().data.assignee
  },
  'PUT /tasks/:id/due-date': async (api, token, id) => {
    const response = await api
      .put(`/api/v1/tasks/${id}/due-date`)
      .header('Authorization', `Bearer ${token}`)
      .json({ today: HOY, dueDate: '2026-12-01' })
    response.assertStatus(200)
    return response.body().data.assignee
  },
}

async function login(api: any, email: string) {
  const response = await api.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
  return response.body().data.token as string
}

/** Una cuenta que mira la lista y no es responsable de nada. */
async function sesion(api: any) {
  await User.create({ fullName: 'Grace Hopper', email: 'mira@example.com', password: 'secreto123' })
  return login(api, 'mira@example.com')
}

async function tareaDe(fullName: string | null, email: string, title = 'Revisar el informe') {
  const responsable = await User.create({ fullName, email, password: 'secreto123' })
  const task = await Task.create({ title, status: 'pending', assigneeId: responsable.id })
  return { responsable, task }
}

async function crearComo(api: any, token: string) {
  const response = await api
    .post('/api/v1/tasks')
    .header('Authorization', `Bearer ${token}`)
    .json({ title: 'Revisar el informe' })
  response.assertStatus(201)
  return response.body().data
}

/** Los campos que sobran y el email colado en un campo permitido. */
function fugas(assignee: Record<string, unknown>, email: string) {
  const encontradas = Object.keys(assignee).filter((campo) => !PERMITIDOS.includes(campo))
  if (JSON.stringify(assignee).includes(email)) encontradas.push('valor del email')
  return encontradas
}

test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const token = await sesion(client)
    const { task } = await tareaDe('Ada Lovelace', 'ada@example.com')

    for (const [origen, obtener] of Object.entries(LECTURAS)) {
      const assignee = await obtener(client, token, task.id)
      assert.equal(assignee.fullName, 'Ada Lovelace', origen)
      assert.equal(assignee.initials, 'AL', origen)
    }
  })

  test('un responsable sin nombre llega con el nombre nulo y sus iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const { task } = await tareaDe(null, 'anonima@example.com')

    for (const [origen, obtener] of Object.entries(LECTURAS)) {
      const assignee = await obtener(client, token, task.id)
      assert.property(assignee, 'fullName', origen)
      assert.isNull(assignee.fullName, origen)
      assert.isString(assignee.initials, origen)
      assert.isNotEmpty(assignee.initials, origen)
    }
  })

  test('quien es responsable ve su tarea igual que cualquier otra cuenta', async ({
    client,
    assert,
  }) => {
    await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const propio = await login(client, 'ada@example.com')
    const ajeno = await sesion(client)

    const creada = await crearComo(client, propio)

    const problemas: string[] = []
    for (const [origen, obtener] of Object.entries(LECTURAS)) {
      const comoResponsable = await obtener(client, propio, creada.id)
      const comoOtro = await obtener(client, ajeno, creada.id)

      // Ser el responsable no da derecho a ver más de la propia cuenta junto a
      // la tarea: el email tampoco sale aunque quien mira sea su dueño.
      for (const campo of fugas(comoResponsable, 'ada@example.com')) {
        problemas.push(`${origen} (como responsable): ${campo}`)
      }
      assert.equal(comoResponsable.fullName, 'Ada Lovelace', origen)
      assert.equal(comoResponsable.initials, 'AL', origen)
      assert.deepEqual(comoResponsable, comoOtro, `${origen} cambia según quién mira`)
    }

    assert.deepEqual(problemas, [])
  })

  test('con varios responsables, cada tarea trae el suyo', async ({ client, assert }) => {
    const token = await sesion(client)
    const ada = await tareaDe('Ada Lovelace', 'ada@example.com', 'Tarea de Ada')
    const alan = await tareaDe('Alan Turing', 'alan@example.com', 'Tarea de Alan')
    const anonima = await tareaDe(null, 'anonima@example.com', 'Tarea sin nombre')
    // Una segunda tarea del mismo responsable, para que un cruce entre tareas
    // no pueda pasar por casualidad.
    const otraDeAda = await Task.create({
      title: 'Otra de Ada',
      status: 'in_progress',
      assigneeId: ada.responsable.id,
    })

    const esperados = [
      { task: ada.task, responsable: ada.responsable },
      { task: alan.task, responsable: alan.responsable },
      { task: anonima.task, responsable: anonima.responsable },
      { task: otraDeAda, responsable: ada.responsable },
    ]

    const response = await (client as any)
      .get('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)
    const lista = response.body().data

    for (const { task, responsable } of esperados) {
      const fila = lista.find((t: any) => t.id === task.id)
      assert.exists(fila, `la tarea «${task.title}» no está en la lista`)
      assert.equal(fila.assignee.id, responsable.id, task.title)
      assert.equal(fila.assignee.fullName, responsable.fullName, task.title)
      assert.equal(fila.assignee.initials, responsable.initials, task.title)
    }
  })
})

/**
 * Casos límite del nombre, metidos por el registro y no directamente en la base
 * de datos, porque es la única vía por la que una cuenta consigue su nombre. El
 * validador recorta los extremos y convierte el nombre vacío o de solo espacios
 * en `null`, así que esos dos casos acaban siendo «responsable sin nombre»; se
 * mantienen para que, si un día deja de hacerlo, el test lo note.
 *
 * La spec de `tasks` exige que el
 * responsable llegue con «sus iniciales»; qué forma tienen la fija el requisito
 * «Iniciales de la cuenta» de `openspec/specs/auth/spec.md`: dos letras
 * mayúsculas. Ninguna spec decide qué letras salen en estos casos, así que se
 * comprueba la forma y no un valor concreto.
 */
test.group('Tasks | responsable con nombres límite', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const casos: Array<[string, string]> = [
    ['un nombre de tres palabras', 'Ada King Lovelace'],
    ['un nombre con doble espacio entre palabras', 'Ada  Lovelace'],
    ['un nombre con un espacio delante', ' Ada'],
    ['un nombre de una sola letra', 'A'],
    ['un nombre vacío', ''],
    ['un nombre de solo espacios', '   '],
  ]

  for (const [titulo, fullName] of casos) {
    test(`${titulo} sigue dando dos iniciales en mayúscula`, async ({ client, assert }) => {
      const signup = await (client as any).post('/api/v1/auth/signup').json({
        fullName,
        email: 'limite@example.com',
        password: 'secreto123',
        passwordConfirmation: 'secreto123',
      })
      signup.assertStatus(200)

      const token = signup.body().data.token
      const creada = await crearComo(client, token)

      for (const [origen, obtener] of Object.entries(LECTURAS)) {
        const assignee = await obtener(client, token, creada.id)
        assert.match(assignee.initials, /^[A-Z]{2}$/, `${origen}: «${assignee.initials}»`)
      }
    })
  }
})

/**
 * Un test por respuesta, para ver cuáles cumplen y cuáles no, y para que una
 * regresión en una ruta que ya cumplía se vea sola.
 */
test.group('Tasks | responsable sin datos de acceso', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('POST /tasks solo expone el id, el nombre y las iniciales del responsable', async ({
    client,
    assert,
  }) => {
    await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const token = await login(client, 'ada@example.com')

    const creada = await crearComo(client, token)

    assert.isObject(creada.assignee)
    assert.deepEqual(fugas(creada.assignee, 'ada@example.com'), [])
  })

  for (const [origen, obtener] of Object.entries(LECTURAS)) {
    test(`${origen} solo expone el id, el nombre y las iniciales del responsable`, async ({
      client,
      assert,
    }) => {
      const token = await sesion(client)
      const { task } = await tareaDe('Ada Lovelace', 'ada@example.com')

      const assignee = await obtener(client, token, task.id)

      assert.isObject(assignee)
      assert.deepEqual(fugas(assignee, 'ada@example.com'), [])
    })
  }
})
