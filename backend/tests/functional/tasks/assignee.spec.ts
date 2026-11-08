// ABOUTME: Tests funcionales de lo que una tarea expone de su responsable.
// ABOUTME: Recorre en orden los tres scenarios del requisito en openspec/specs/tasks/spec.md.
import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Cubre el requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`, scenario a scenario y en el orden del spec:
 *
 *   1. Responsable identificable
 *   2. La tarea no filtra datos de cuenta (suelta y dentro de la lista)
 *   3. Responsable sin nombre
 *
 * La tarea suelta exige `today`, así que se le pasa un día fijo: el vencimiento
 * no es lo que se prueba aquí.
 */
const HOY = '2026-11-07'
const DATOS_DE_CUENTA = ['email', 'password', 'createdAt', 'updatedAt']

// El registro Tuyau tipa `data` como tarea o lista; la ruta de la lista siempre devuelve lista.
type TareaEnLista = { assignee: { fullName: string | null; initials: string } }
const listaDe = (body: { data: unknown }) => body.data as TareaEnLista[]

async function tareaDe(fullName: string | null, email: string) {
  const responsable = await User.create({ fullName, email, password: 'secreto123' })
  const tarea = await Task.create({
    title: 'Revisar el informe',
    status: 'pending',
    assigneeId: responsable.id,
  })
  return { responsable, tarea }
}

test.group('Tasks | responsable — 1. Responsable identificable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('la tarea suelta trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const { responsable, tarea } = await tareaDe('Ada Lovelace', 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .loginAs(responsable)

    response.assertStatus(200)
    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('cada tarea de la lista trae el nombre y las iniciales de su responsable', async ({
    client,
    assert,
  }) => {
    const ada = await tareaDe('Ada Lovelace', 'ada@example.com')
    await tareaDe('Alan Turing', 'alan@example.com')

    const response = await client.get('/api/v1/tasks').loginAs(ada.responsable)

    response.assertStatus(200)
    const responsables = listaDe(response.body()).map((t) => [
      t.assignee.fullName,
      t.assignee.initials,
    ])
    assert.sameDeepMembers(responsables, [
      ['Ada Lovelace', 'AL'],
      ['Alan Turing', 'AT'],
    ])
  })
})

test.group('Tasks | responsable — 2. La tarea no filtra datos de cuenta', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('la tarea suelta no incluye el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { responsable, tarea } = await tareaDe('Ada Lovelace', 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .loginAs(responsable)

    response.assertStatus(200)
    assert.notAnyProperties(response.body().data.assignee, DATOS_DE_CUENTA)
  })

  test('ninguna tarea de la lista incluye el email ni otros datos de la cuenta', async ({
    client,
    assert,
  }) => {
    const { responsable } = await tareaDe('Ada Lovelace', 'ada@example.com')

    const response = await client.get('/api/v1/tasks').loginAs(responsable)

    response.assertStatus(200)
    const tareas = listaDe(response.body())
    assert.lengthOf(tareas, 1)
    for (const t of tareas) {
      assert.notAnyProperties(t.assignee, DATOS_DE_CUENTA)
    }
  })
})

test.group('Tasks | responsable — 3. Responsable sin nombre', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('la tarea suelta trae el nombre nulo y las iniciales igualmente', async ({
    client,
    assert,
  }) => {
    const { responsable, tarea } = await tareaDe(null, 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${tarea.id}`)
      .qs({ today: HOY })
      .loginAs(responsable)

    response.assertStatus(200)
    const { assignee } = response.body().data
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notProperty(assignee, 'email')
  })

  test('la lista trae el nombre nulo y las iniciales igualmente', async ({ client, assert }) => {
    const { responsable } = await tareaDe(null, 'ada@example.com')

    const response = await client.get('/api/v1/tasks').loginAs(responsable)

    response.assertStatus(200)
    const [{ assignee }] = listaDe(response.body())
    assert.isNull(assignee.fullName)
    assert.equal(assignee.initials, 'AE')
    assert.notProperty(assignee, 'email')
  })
})
