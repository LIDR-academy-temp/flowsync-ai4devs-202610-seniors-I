import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta y responsable sin nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const today = '2026-08-13'

  async function sesion(client: any, fullName: string | null, email = 'ada@example.com') {
    await User.create({ fullName, email, password: 'secreto123' })

    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  async function crearTarea(client: any, token: string, title = 'Revisar el informe') {
    const response = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title })

    response.assertStatus(201)
    return response.body().data
  }

  async function obtenerSuelta(client: any, token: string, id: number) {
    const response = await client
      .get(`/api/v1/tasks/${id}`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today })

    response.assertStatus(200)
    return response.body().data
  }

  async function obtenerDeLaLista(client: any, token: string, id: number) {
    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    return response.body().data.find((tarea: any) => tarea.id === id)
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const token = await sesion(client, 'Ada Lovelace')
    const creada = await crearTarea(client, token)

    // Decisión: «obtener una tarea» se lee como las dos formas de leerla que da la
    // spec: suelta (`GET /api/v1/tasks/:id`) y dentro de la lista (`GET /api/v1/tasks`).
    const suelta = await obtenerSuelta(client, token, creada.id)
    const enLista = await obtenerDeLaLista(client, token, creada.id)
    assert.exists(enLista)

    for (const tarea of [suelta, enLista]) {
      // Decisión: el nombre viaja en `fullName`, el mismo campo que usa la cuenta
      // en `openspec/specs/auth/spec.md`; esta spec solo dice «el nombre».
      assert.equal(tarea.assignee.fullName, 'Ada Lovelace')
      // Decisión: las iniciales esperadas son "AL" y viajan en `initials`, según
      // el requisito «Iniciales de la cuenta» de `openspec/specs/auth/spec.md`;
      // esta spec no da el valor.
      assert.equal(tarea.assignee.initials, 'AL')
    }
  })

  test('el responsable de una tarea no expone el email ni ningún otro dato de la cuenta', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, 'Ada Lovelace')
    const creada = await crearTarea(client, token)

    const estado = await client
      .patch(`/api/v1/tasks/${creada.id}/status`)
      .header('Authorization', `Bearer ${token}`)
      .json({ status: 'in_progress' })
    estado.assertStatus(200)

    const fecha = await client
      .put(`/api/v1/tasks/${creada.id}/due-date`)
      .header('Authorization', `Bearer ${token}`)
      .qs({ today })
      .json({ dueDate: '2026-09-30' })
    fecha.assertStatus(200)

    // Decisión: «cualquier tarea, suelta o dentro de la lista» incluye toda
    // respuesta que devuelva una tarea —crear, consultar suelta, listar, cambiar
    // estado y cambiar fecha—, porque el requisito prohíbe exponer esos datos
    // «junto a la tarea» sin limitarlo a ninguna ruta.
    const respuestas: Array<[string, any]> = [
      ['POST /tasks', creada],
      ['GET /tasks/:id', await obtenerSuelta(client, token, creada.id)],
      ['GET /tasks', await obtenerDeLaLista(client, token, creada.id)],
      ['PATCH /tasks/:id/status', estado.body().data],
      ['PUT /tasks/:id/due-date', fecha.body().data],
    ]

    for (const [ruta, tarea] of respuestas) {
      assert.exists(tarea, `${ruta} no devolvió la tarea`)
      assert.notProperty(tarea.assignee, 'email', `${ruta} expone el email`)
      assert.notInclude(
        JSON.stringify(tarea.assignee),
        'ada@example.com',
        `${ruta} deja ver el email`
      )
      // Decisión: el requisito dice que la tarea lleva «el nombre y las iniciales»
      // de su responsable y «ningún otro dato de esa cuenta»; la lectura literal
      // es que `assignee` trae exactamente esos dos campos y nada más (ni `id`,
      // ni fechas de la cuenta, ni nada relacionado con el acceso).
      assert.sameMembers(
        Object.keys(tarea.assignee),
        ['fullName', 'initials'],
        `${ruta} expone más datos de la cuenta que el nombre y las iniciales`
      )
    }
  })

  test('un responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client, null)
    const creada = await crearTarea(client, token)

    const suelta = await obtenerSuelta(client, token, creada.id)
    const enLista = await obtenerDeLaLista(client, token, creada.id)
    assert.exists(enLista)

    for (const tarea of [suelta, enLista]) {
      // Decisión: «llega nulo» se lee como el campo presente con valor `null`, no
      // ausente ni cadena vacía.
      assert.property(tarea.assignee, 'fullName')
      assert.isNull(tarea.assignee.fullName)
      // Decisión: esta spec solo exige que las iniciales «sigan llegando», no su
      // valor; se comprueba que llegan como texto no vacío y no se fija cuáles
      // son (la spec de auth las derivaría del email, pero aquí no se pide).
      assert.isString(tarea.assignee.initials)
      assert.isNotEmpty(tarea.assignee.initials)
    }
  })
})
