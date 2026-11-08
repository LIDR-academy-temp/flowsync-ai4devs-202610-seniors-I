import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no
 * filtra datos de cuenta (suelta y dentro de la lista) y responsable sin
 * nombre.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-08'

  async function sesion(client: any, email: string) {
    const response = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    return response.body().data.token as string
  }

  /**
   * Crea al responsable y a quien mira (cuentas distintas), una tarea a nombre
   * del primero, y devuelve el token de quien mira.
   */
  async function tareaDe(client: any, fullName: string | null, email: string) {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })
    await User.create({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'secreto123',
    })
    const tarea = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })

    return { tarea, token: await sesion(client, 'grace@example.com') }
  }

  test('el responsable de la tarea llega con su nombre y sus iniciales', async ({
    client,
    assert,
  }) => {
    const { tarea, token } = await tareaDe(client, 'Ada Lovelace', 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la tarea no filtra el email ni datos de acceso de su responsable, suelta ni en la lista', async ({
    client,
    assert,
  }) => {
    const { tarea, token } = await tareaDe(client, 'Ada Lovelace', 'ada@example.com')

    function sinDatosDeAcceso(response: any, forma: string) {
      response.assertStatus(200)
      const assignee = response.body().data.assignee ?? null
      assert.isNotNull(assignee, `${forma}: la tarea trae assignee`)
      assert.notProperty(assignee, 'email', `${forma}: assignee.email`)
      assert.notProperty(assignee, 'password', `${forma}: assignee.password`)
      assert.notProperty(assignee, 'rememberMeToken', `${forma}: assignee.rememberMeToken`)
      assert.notInclude(
        JSON.stringify(response.body()),
        'ada@example.com',
        `${forma}: el email aparece en algún punto de la respuesta`
      )
    }

    const suelta = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    sinDatosDeAcceso(suelta, 'tarea suelta')

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    lista.assertStatus(200)
    const enLista = lista.body().data.find((t: { id: number }) => t.id === tarea.id)
    assert.exists(enLista, 'la tarea aparece en la lista')
    sinDatosDeAcceso({ assertStatus() {}, body: () => ({ data: enLista }) }, 'tarea en la lista')
  })

  test('un responsable sin nombre llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { tarea, token } = await tareaDe(client, null, 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)
    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
  })
})
