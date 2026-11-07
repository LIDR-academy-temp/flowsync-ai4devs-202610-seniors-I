import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * El responsable de cada tarea. Cubre los tres scenarios del requisito «Lo que
 * cada tarea muestra de su responsable» de `openspec/specs/tasks/spec.md`:
 * responsable identificable, la tarea no filtra datos de cuenta, y responsable
 * sin nombre.
 *
 * Cada test mira la tarea por las dos lecturas que la devuelven —la lista y la
 * tarea suelta— porque el requisito habla de «cada tarea» sin distinguir.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  // SUPUESTO: el día de referencia es irrelevante para el responsable; se fija
  // uno cualquiera solo porque la tarea suelta lo exige.
  const today = '2026-11-07'

  /**
   * Crea la cuenta, inicia sesión y crea una tarea con ella, de modo que esa
   * cuenta queda como responsable. Devuelve el token y el id de la tarea.
   */
  async function tareaDe(client: any, fullName: string | null, email = 'ada@example.com') {
    await User.create({ fullName, email, password: 'secreto123' })

    const login = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })
    const token = login.body().data.token as string

    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })
    creada.assertStatus(201)

    return { token, id: creada.body().data.id as number }
  }

  /** La tarea tal como llega en la lista y tal como llega suelta. */
  async function lecturas(client: any, token: string, id: number) {
    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)

    const suelta = await client
      .get(`/api/v1/tasks/${id}`)
      .qs({ today })
      .header('Authorization', `Bearer ${token}`)
    suelta.assertStatus(200)

    const enLista = lista.body().data.find((t: { id: number }) => t.id === id)

    return { enLista, suelta: suelta.body().data }
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const { token, id } = await tareaDe(client, 'Ada Lovelace')
    const { enLista, suelta } = await lecturas(client, token, id)

    for (const tarea of [enLista, suelta]) {
      assert.exists(tarea)
      assert.equal(tarea.assignee.fullName, 'Ada Lovelace')
      // SUPUESTO: «sus iniciales» son las que define el requisito «Iniciales de
      // la cuenta» de auth (inicial de cada palabra), es decir, "AL".
      assert.equal(tarea.assignee.initials, 'AL')
    }
  })

  test('el responsable no trae el email ni ningún otro dato de la cuenta', async ({
    client,
    assert,
  }) => {
    const { token, id } = await tareaDe(client, 'Ada Lovelace')
    const { enLista, suelta } = await lecturas(client, token, id)

    for (const tarea of [enLista, suelta]) {
      assert.exists(tarea)
      assert.notProperty(tarea.assignee, 'email')
      // SUPUESTO: el `id` de la cuenta se admite junto al nombre y las
      // iniciales, como referencia para el cliente. La spec dice «ningún otro
      // dato» sin aclarar si el identificador cuenta como tal.
      assert.containsSubset(['id', 'fullName', 'initials'], Object.keys(tarea.assignee))
      // El email no puede colarse bajo ninguna otra clave.
      assert.notInclude(JSON.stringify(tarea.assignee), 'ada@example.com')
    }
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { token, id } = await tareaDe(client, null)
    const { enLista, suelta } = await lecturas(client, token, id)

    for (const tarea of [enLista, suelta]) {
      assert.exists(tarea)
      assert.property(tarea.assignee, 'fullName')
      assert.isNull(tarea.assignee.fullName)
      // SUPUESTO: «siguen llegando» se comprueba como texto no vacío, sin fijar
      // el valor. Auth las deriva del email ("AE" para ada@example.com), pero
      // este requisito no dice de dónde salen.
      assert.isString(tarea.assignee.initials)
      assert.isAbove(tarea.assignee.initials.length, 0)
      assert.notProperty(tarea.assignee, 'email')
    }
  })
})
