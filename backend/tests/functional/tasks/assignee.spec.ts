import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Un test por scenario del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * Quien mira y quien lleva la tarea son cuentas distintas a propósito: así lo
 * que llega en `assignee` solo puede venir del responsable, no de la sesión.
 *
 * Las dos lecturas de una tarea son la lista (`GET /tasks`) y la tarea suelta
 * (`GET /tasks/:id`, que exige el día de referencia en `today`).
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-08'

  async function quienMira() {
    return User.create({
      fullName: 'Grace Hopper',
      email: 'grace@example.com',
      password: 'secreto123',
    })
  }

  async function tareaDe(responsable: User) {
    return Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })
  }

  function enLaLista(body: any, id: number) {
    const tarea = body.data.find((t: { id: number }) => t.id === id)
    if (!tarea) throw new Error(`la tarea ${id} no aparece en la lista`)
    return tarea
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const ada = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const tarea = await tareaDe(ada)
    const viewer = await quienMira()

    const suelta = await client.get(`/api/v1/tasks/${tarea.id}`).qs({ today: HOY }).loginAs(viewer)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').loginAs(viewer)
    lista.assertStatus(200)

    for (const assignee of [
      suelta.body().data.assignee,
      enLaLista(lista.body(), tarea.id).assignee,
    ]) {
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('el responsable de una tarea no trae el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const ada = await User.create({
      fullName: 'Ada Lovelace',
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const tarea = await tareaDe(ada)
    const viewer = await quienMira()

    const suelta = await client.get(`/api/v1/tasks/${tarea.id}`).qs({ today: HOY }).loginAs(viewer)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').loginAs(viewer)
    lista.assertStatus(200)

    const lecturas = {
      'tarea suelta': suelta.body().data.assignee,
      'lista': enLaLista(lista.body(), tarea.id).assignee,
    }

    // El requisito: nombre e iniciales «y NO SHALL exponer ningún otro dato de
    // esa cuenta». El `id` se admite porque la relación tarea→responsable ya lo
    // implica; cualquier otra clave es un dato de cuenta de más.
    const permitidas = ['id', 'fullName', 'initials']

    for (const [lectura, assignee] of Object.entries(lecturas)) {
      // Primero las claves de más, para que un fallo enseñe TODO lo que sobra
      // (email incluido) y no solo la primera clave que encuentre.
      const deMas = Object.keys(assignee).filter((clave) => !permitidas.includes(clave))
      assert.deepEqual(deMas, [], `la ${lectura} expone datos de cuenta de más`)

      assert.notProperty(assignee, 'email', `la ${lectura} expone el email del responsable`)
      assert.notInclude(
        JSON.stringify(assignee),
        'ada@example.com',
        `la ${lectura} filtra el email en algún campo`
      )
    }
  })

  test('un responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const sinNombre = await User.create({
      fullName: null,
      email: 'ada@example.com',
      password: 'secreto123',
    })
    const tarea = await tareaDe(sinNombre)
    const viewer = await quienMira()

    const suelta = await client.get(`/api/v1/tasks/${tarea.id}`).qs({ today: HOY }).loginAs(viewer)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').loginAs(viewer)
    lista.assertStatus(200)

    for (const assignee of [
      suelta.body().data.assignee,
      enLaLista(lista.body(), tarea.id).assignee,
    ]) {
      // `null` explícito: que la clave falte no es lo mismo que «llega nulo».
      assert.property(assignee, 'fullName')
      assert.isNull(assignee.fullName)
      assert.isString(assignee.initials)
      assert.isNotEmpty(assignee.initials)
    }
  })
})
