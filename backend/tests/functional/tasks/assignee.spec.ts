import Task from '#models/task'
import User from '#models/user'
import { test } from '@japa/runner'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea muestra de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`: el responsable identificable por nombre e
 * iniciales, la tarea que no filtra datos de cuenta y el responsable sin nombre.
 *
 * Cada scenario se comprueba en las dos lecturas que devuelven tareas —la lista
 * y la tarea suelta—, porque el requisito habla de «cada tarea» y el segundo
 * scenario nombra las dos expresamente.
 */
test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  const HOY = '2026-11-05'

  /**
   * Quien mira es siempre una cuenta distinta del responsable, para que lo que
   * llega en `assignee` no pueda confundirse con los datos de la propia sesión.
   */
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

  async function tareaDe(fullName: string | null, email: string) {
    const responsable = await User.create({ fullName, email, password: 'secreto123' })
    return Task.create({
      title: 'Revisar el informe',
      status: 'pending',
      assigneeId: responsable.id,
    })
  }

  async function assigneeEnLista(client: any, token: string, taskId: number) {
    const response = await client.get('/api/v1/tasks').header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)

    const tarea = response.body().data.find((t: { id: number }) => t.id === taskId)
    return tarea.assignee
  }

  async function assigneeSuelta(client: any, token: string, taskId: number) {
    const response = await client
      .get(`/api/v1/tasks/${taskId}`)
      .qs({ today: HOY })
      .header('Authorization', `Bearer ${token}`)
    response.assertStatus(200)

    return response.body().data.assignee
  }

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const token = await sesion(client)
    const task = await tareaDe('Ada Lovelace', 'ada@example.com')

    for (const assignee of [
      await assigneeEnLista(client, token, task.id),
      await assigneeSuelta(client, token, task.id),
    ]) {
      assert.equal(assignee.fullName, 'Ada Lovelace')
      assert.equal(assignee.initials, 'AL')
    }
  })

  test('el responsable de una tarea no expone su email ni datos de acceso', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const task = await tareaDe('Ada Lovelace', 'ada@example.com')

    for (const assignee of [
      await assigneeEnLista(client, token, task.id),
      await assigneeSuelta(client, token, task.id),
    ]) {
      assert.notProperty(assignee, 'email')

      // No basta con que falte la clave `email`: el dato no puede colarse bajo
      // ningún otro nombre, y tampoco la contraseña ni su hash.
      const serialized = JSON.stringify(assignee)
      assert.notInclude(serialized, 'ada@example.com')
      assert.notInclude(serialized, 'password')
    }
  })

  test('un responsable sin nombre llega con el nombre nulo y con iniciales', async ({
    client,
    assert,
  }) => {
    const token = await sesion(client)
    const task = await tareaDe(null, 'ada@example.com')

    for (const assignee of [
      await assigneeEnLista(client, token, task.id),
      await assigneeSuelta(client, token, task.id),
    ]) {
      assert.property(assignee, 'fullName')
      assert.isNull(assignee.fullName)
      assert.isString(assignee.initials)
      assert.isNotEmpty(assignee.initials)
    }
  })
})
