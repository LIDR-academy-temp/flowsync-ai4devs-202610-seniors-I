import User from '#models/user'
import { test } from '@japa/runner'
import type { ApiClient } from '@japa/api-client'
import testUtils from '@adonisjs/core/services/test_utils'

/**
 * Lo que cada tarea enseña de su responsable. Cubre los tres scenarios del
 * requisito «Lo que cada tarea muestra de su responsable» de
 * `openspec/specs/tasks/spec.md`.
 *
 * «Se obtiene una tarea» no tiene una sola puerta: la tarea llega suelta
 * (`GET /tasks/:id`), dentro de la lista (`GET /tasks`), recién creada
 * (`POST /tasks`) y tras cambiar su estado (`PATCH /tasks/:id/status`). Cada
 * test recorre todas, y junta lo que encuentra antes de afirmar, para que un
 * fallo diga en qué puertas se rompe y no solo en la primera.
 *
 * Transacción global por el mismo motivo que en `auth/`: la suite pega contra el
 * SQLite del servidor de desarrollo.
 */

const HOY = '2026-11-20'

/**
 * Se lee la respuesta como JSON sin más y no con el tipo del registro generado:
 * ese tipo describe lo que el transformer devuelve hoy, email incluido, y lo
 * que se comprueba aquí es justo si eso es correcto.
 */
type Assignee = Record<string, unknown>
type TareaJson = { id: number; assignee?: Assignee }

async function cuentaConToken(fullName: string | null, email: string) {
  const user = await User.create({ fullName, email, password: 'secreto123' })
  const token = await User.accessTokens.create(user)
  return { user, bearer: `Bearer ${token.value!.release()}` }
}

/**
 * El `assignee` de una tarea de `owner`, tal y como sale por cada puerta. La
 * creación la hace el propio `owner`, porque la tarea nace a su nombre.
 */
async function assigneePorCadaPuerta(client: ApiClient, owner: { bearer: string }) {
  const creada = await client
    .post('/api/v1/tasks')
    .header('Authorization', owner.bearer)
    .json({ title: 'Revisar el informe' })
  creada.assertStatus(201)
  const tarea = creada.body().data as TareaJson

  const suelta = await client
    .get(`/api/v1/tasks/${tarea.id}`)
    .qs({ today: HOY })
    .header('Authorization', owner.bearer)
  suelta.assertStatus(200)

  const lista = await client.get('/api/v1/tasks').header('Authorization', owner.bearer)
  lista.assertStatus(200)
  const enLista = (lista.body().data as TareaJson[]).find((t) => t.id === tarea.id)

  const cambiada = await client
    .patch(`/api/v1/tasks/${tarea.id}/status`)
    .header('Authorization', owner.bearer)
    .json({ status: 'in_progress' })
  cambiada.assertStatus(200)

  const porPuerta: Record<string, Assignee | undefined> = {
    'POST /tasks': tarea.assignee,
    'GET /tasks/:id': (suelta.body().data as TareaJson).assignee,
    'GET /tasks': enLista?.assignee,
    'PATCH /tasks/:id/status': (cambiada.body().data as TareaJson).assignee,
  }
  return porPuerta
}

test.group('Tasks | responsable', (group) => {
  group.each.setup(() => testUtils.db().withGlobalTransaction())

  test('el responsable llega con su nombre y sus iniciales', async ({ client, assert }) => {
    const ada = await cuentaConToken('Ada Lovelace', 'ada@example.com')

    const porPuerta = await assigneePorCadaPuerta(client, ada)

    for (const [puerta, assignee] of Object.entries(porPuerta)) {
      assert.isDefined(assignee, `${puerta}: la tarea no trae assignee`)
      assert.equal(assignee!.fullName, 'Ada Lovelace', `${puerta}: nombre`)
      assert.equal(assignee!.initials, 'AL', `${puerta}: iniciales`)
    }
  })

  test('el responsable no trae el email ni ningún dato de acceso', async ({ client, assert }) => {
    const ada = await cuentaConToken('Ada Lovelace', 'ada@example.com')

    const porPuerta = await assigneePorCadaPuerta(client, ada)

    // Lo único permitido: identificar y representar. Cualquier otra clave es
    // un dato de la cuenta que la tarea no tiene por qué contar.
    const permitidas = ['id', 'fullName', 'initials']
    const fugas: string[] = []
    for (const [puerta, assignee] of Object.entries(porPuerta)) {
      const sobrantes = Object.keys(assignee ?? {}).filter((k) => !permitidas.includes(k))
      const serializado = JSON.stringify(assignee ?? {})
      if (serializado.includes('ada@example.com')) sobrantes.push('(valor del email)')
      if (sobrantes.length) fugas.push(`${puerta} → ${sobrantes.join(', ')}`)
    }

    assert.deepEqual(fugas, [], `el assignee expone datos de la cuenta:\n${fugas.join('\n')}`)
  })

  test('un responsable sin nombre llega con nombre nulo e iniciales', async ({
    client,
    assert,
  }) => {
    const anonima = await cuentaConToken(null, 'ada@example.com')

    const porPuerta = await assigneePorCadaPuerta(client, anonima)

    for (const [puerta, assignee] of Object.entries(porPuerta)) {
      assert.isDefined(assignee, `${puerta}: la tarea no trae assignee`)
      assert.property(assignee!, 'fullName', `${puerta}: falta la clave fullName`)
      assert.isNull(assignee!.fullName, `${puerta}: nombre`)
      assert.equal(assignee!.initials, 'AE', `${puerta}: iniciales`)
    }
  })
})
