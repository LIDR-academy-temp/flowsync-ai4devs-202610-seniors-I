import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: responsable identificable, la tarea no filtra
 * datos de cuenta, y responsable sin nombre.
 *
 * Aislamiento con transacción global, igual que en `auth/`: la suite functional
 * comparte el fichero SQLite con el servidor de desarrollo.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  // La consulta de una tarea suelta exige el día de quien mira; su valor es
  // indiferente para lo que se comprueba aquí.
  const today = '2026-11-05'

  async function tareaDe(fullName: string | null, email: string) {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })
    const task = await Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })
    return { responsable, task }
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const { responsable, task } = await tareaDe('Ada Lovelace', 'ada@example.com')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today })
      .loginAs(responsable)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.equal(assignee.fullName, 'Ada Lovelace')
    assert.equal(assignee.initials, 'AL')
  })

  test('el responsable no trae el email ni datos de acceso, ni suelta ni en la lista', async ({
    client,
    assert,
  }) => {
    const { responsable, task } = await tareaDe('Ada Lovelace', 'ada@example.com')

    const suelta = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today })
      .loginAs(responsable)
    suelta.assertStatus(200)

    const lista = await client.get('/api/v1/tasks').loginAs(responsable)
    lista.assertStatus(200)
    const enLaLista = lista.body().data.find((t: { id: number }) => t.id === task.id)
    assert.exists(enLaLista, 'la tarea tiene que salir en la lista por defecto')

    for (const [donde, assignee] of [
      ['suelta', suelta.body().data.assignee],
      ['en la lista', enLaLista.assignee],
    ]) {
      // Se mira la clave y también el valor: el email no debe aparecer ni
      // con otro nombre de campo.
      const serialized = JSON.stringify(assignee)
      assert.notProperty(assignee, 'email', `assignee ${donde} trae la clave email`)
      assert.notInclude(serialized, 'ada@example.com', `assignee ${donde} trae el email`)
      assert.notInclude(serialized, 'password', `assignee ${donde} trae la contraseña`)
      assert.notInclude(serialized, 'secreto123', `assignee ${donde} trae la contraseña`)
      assert.notInclude(serialized.toLowerCase(), 'token', `assignee ${donde} trae un token`)
    }
  })

  test('sin nombre, el responsable llega con nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const { responsable, task } = await tareaDe(null, 'sin-nombre@example.com')

    const response = await client
      .get(`/api/v1/tasks/${task.id}`)
      .qs({ today })
      .loginAs(responsable)

    response.assertStatus(200)

    const { assignee } = response.body().data
    assert.property(assignee, 'fullName')
    assert.isNull(assignee.fullName)
    assert.isString(assignee.initials)
    assert.isNotEmpty(assignee.initials)
  })
})
