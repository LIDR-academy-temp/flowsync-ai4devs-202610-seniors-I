import User from '#models/user'
import Task from '#models/task'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 *
 * El requisito habla de «obtener» una tarea, suelta o dentro de la lista, así
 * que cada scenario se comprueba por los dos caminos de lectura:
 * `GET /api/v1/tasks` y `GET /api/v1/tasks/:id`.
 *
 * Las tareas se crean en estado `pending` a propósito: la lista sin filtro deja
 * fuera lo hecho (`DEFAULT_LIST_STATUSES`), y una tarea hecha no saldría en ella.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-08'

  async function sesion(client: any) {
    await User.create({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'secreto123',
    })

    const response = await client
      .post('/api/v1/auth/login')
      .json({ email: 'grace@example.com', password: 'secreto123' })

    return response.body().data.token as string
  }

  async function tareaDe(responsable: { fullName: string | null; email: string }) {
    const user = await User.create({ ...responsable, password: 'secreto123' })
    return Task.create({ title: 'Revisar el informe', status: 'pending', assigneeId: user.id })
  }

  /** El `assignee` de la tarea tal como sale suelta y tal como sale en la lista. */
  async function assigneePorLosDosCaminos(
    client: any,
    assert: any,
    token: string,
    taskId: number
  ) {
    const detalle = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    detalle.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)

    const enLaLista = lista.body().data.find((t: any) => t.id === taskId)
    assert.exists(enLaLista, 'la tarea no aparece en la lista')

    return { detalle: detalle.body().data.assignee, lista: enLaLista.assignee }
  }

  test('la tarea trae el nombre y las iniciales de su responsable', async ({ client, assert }) => {
    const token = await sesion(client)
    const tarea = await tareaDe({ fullName: 'Ada Lovelace', email: 'ada@example.com' })

    const assignee = await assigneePorLosDosCaminos(client, assert, token, tarea.id)

    for (const camino of [assignee.detalle, assignee.lista]) {
      assert.equal(camino.fullName, 'Ada Lovelace')
      assert.equal(camino.initials, 'AL')
    }
  })

  test('la tarea no expone el email ni datos de acceso de su responsable', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const tarea = await tareaDe({ fullName: 'Ada Lovelace', email: 'ada@example.com' })

    const assignee = await assigneePorLosDosCaminos(client, assert, token, tarea.id)

    // Se busca el email como texto en todo el objeto, sin distinguir mayúsculas,
    // y no solo como clave `email`: el scenario prohíbe el dato, se llame como
    // se llame el campo. Lista negra deliberada: ver la línea 3 de la parte B.
    const filtra = (a: object) => {
      const serializado = JSON.stringify(a).toLowerCase()
      return ['ada@example.com', 'password', 'token'].some((dato) => serializado.includes(dato))
    }

    // Los dos caminos en una sola aserción, para que el fallo diga cuál filtra.
    assert.deepEqual(
      { detalle: filtra(assignee.detalle), lista: filtra(assignee.lista) },
      { detalle: false, lista: false }
    )
  })

  test('un responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const tarea = await tareaDe({ fullName: null, email: 'sin-nombre@example.com' })

    const assignee = await assigneePorLosDosCaminos(client, assert, token, tarea.id)

    for (const camino of [assignee.detalle, assignee.lista]) {
      assert.isNull(camino.fullName)
      // «Siguen llegando» y sirven para representarlo: dos letras mayúsculas
      // (la forma que fija la spec de auth), nunca el email ni un trozo con '@'.
      assert.match(camino.initials, /^[A-Z]{2}$/)
      assert.notInclude(camino.initials, '@')
    }
  })
})
