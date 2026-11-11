import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Responsable de una tarea. Cubre los tres scenarios del requisito «Lo que cada
 * tarea muestra de su responsable» de `openspec/specs/tasks/spec.md`:
 * responsable identificable, la tarea no filtra datos de cuenta, y responsable
 * sin nombre.
 *
 * El aislamiento es una transacción global y no un truncate a propósito: la
 * suite functional pega contra el mismo fichero SQLite que el servidor de
 * desarrollo (`config/database.ts` no tiene override por entorno), y vaciarlo
 * se llevaría por delante los datos con los que se está trabajando.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('el responsable se identifica por su nombre y sus iniciales', async ({ client, assert }) => {
    await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'ada@example.com', password: 'secreto123' })

    const token = login.body().data.token as string

    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    creada.assertStatus(201)

    const response = await client
      .get(`/api/v1/tasks/${creada.body().data.id}`)
      .qs({ today: '2026-11-05' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('la tarea no filtra el email ni otros datos de acceso', async ({ client, assert }) => {
    const email = 'ada@example.com'

    await User.create({
      fullName: 'Ada Lovelace',
      email,
      password: 'secreto123',
    })

    const login = await client.post('/api/v1/auth/login').json({ email, password: 'secreto123' })

    const token = login.body().data.token as string

    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    creada.assertStatus(201)
    const id = creada.body().data.id

    // El scenario vale igual para la tarea suelta y para la que va dentro de la lista.
    function sinDatosDeAcceso(assignee: Record<string, unknown>) {
      const claves = Object.keys(assignee)
      assert.notInclude(claves, 'email')
      assert.notInclude(claves, 'password')

      const serialized = JSON.stringify(assignee)
      assert.notInclude(serialized, email)
      assert.notInclude(serialized, 'secreto123')
      assert.notInclude(serialized, 'password')
    }

    const suelta = await client
      .get(`/api/v1/tasks/${id}`)
      .qs({ today: '2026-11-05' })
      .header('Authorization', `Bearer ${token}`)

    suelta.assertStatus(200)
    sinDatosDeAcceso(suelta.body().data.assignee)

    const lista = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)

    lista.assertStatus(200)
    const enLista = (lista.body().data as Array<{ id: number; assignee: Record<string, unknown> }>).find(
      (tarea) => tarea.id === id
    )
    assert.isDefined(enLista)
    sinDatosDeAcceso(enLista.assignee)
  })

  test('un responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    await User.create({
      fullName: null,
      email: 'sin-nombre@example.com',
      password: 'secreto123',
    })

    const login = await client
      .post('/api/v1/auth/login')
      .json({ email: 'sin-nombre@example.com', password: 'secreto123' })

    const token = login.body().data.token as string

    const creada = await client
      .post('/api/v1/tasks')
      .header('Authorization', `Bearer ${token}`)
      .json({ title: 'Revisar el informe' })

    creada.assertStatus(201)

    const response = await client
      .get(`/api/v1/tasks/${creada.body().data.id}`)
      .qs({ today: '2026-11-05' })
      .header('Authorization', `Bearer ${token}`)

    response.assertStatus(200)

    const assignee = response.body().data.assignee
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'SE')
  })
})
