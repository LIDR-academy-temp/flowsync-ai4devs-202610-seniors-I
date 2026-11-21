import Task from '#models/task'
import { setTaskDueDateValidator, toCalendarDay } from '#validators/task'
import type { HttpContext } from '@adonisjs/core/http'
import TaskDetailTransformer from '#transformers/task_detail_transformer'
import { ApiBearerAuth, ApiBody, ApiOperation, ApiResponse } from '@foadonis/openapi/decorators'
import {
  NotFoundResponse,
  TaskDetailResponse,
  UnauthorizedResponse,
  ValidationErrorResponse,
} from '#openapi/schemas'

@ApiBearerAuth()
@ApiResponse({
  status: 401,
  description: 'Falta el token o no es válido.',
  type: UnauthorizedResponse,
})
export default class TaskDueDatesController {
  /**
   * Fijar, cambiar y retirar la fecha de vencimiento son la misma operación, y
   * por eso comparten endpoint: quitar la fecha no es borrar un recurso, es
   * poner el valor «sin fecha», que es un valor legítimo del campo.
   *
   * Endpoint propio en vez de un update genérico de la tarea, por el mismo
   * motivo que el estado: por ahí se colarían el título y el responsable, que
   * este change no permite tocar.
   *
   * Cualquiera con sesión puede cambiar la fecha de cualquier tarea, igual que
   * el estado. No se comprueba quién es el responsable.
   */
  @ApiOperation({
    summary: 'Fijar, cambiar o quitar la fecha de vencimiento',
    description:
      'Sobre cualquier tarea, sea o no de quien la cambia. Una fecha pasada se acepta. Solo cambia la fecha.',
  })
  @ApiBody({
    required: true,
    schema: {
      type: 'object',
      required: ['dueDate', 'today'],
      properties: {
        dueDate: {
          type: 'string',
          format: 'date',
          nullable: true,
          description: 'Día del calendario (AAAA-MM-DD), o `null` para quitar la fecha.',
        },
        today: {
          type: 'string',
          format: 'date',
          description:
            'Día de referencia de quien hace el cambio (AAAA-MM-DD), para resolver `isOverdue` en la respuesta.',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'La tarea con su nueva fecha y su vencimiento ya resuelto contra `today`.',
    type: TaskDetailResponse,
  })
  @ApiResponse({
    status: 404,
    description: 'No existe ninguna tarea con ese id. Se comprueba antes de validar el cuerpo.',
    type: NotFoundResponse,
  })
  @ApiResponse({
    status: 422,
    description: '`dueDate` o `today` falta, está mal formado o no existe en el calendario.',
    type: ValidationErrorResponse,
  })
  async update({ params, request, serialize }: HttpContext) {
    const task = await Task.findOrFail(params.id)
    const { today, dueDate } = await request.validateUsing(setTaskDueDateValidator)

    // El `DateTime` del validador se queda aquí: hacia dentro, una fecha de
    // vencimiento es un día en texto y nunca un instante.
    task.dueDate = dueDate === null ? null : toCalendarDay(dueDate)
    await task.save()
    await task.load('assignee')

    // Se devuelve ya resuelta contra el día de quien pide, para que aplazar una
    // tarea vencida deje de mostrarla vencida en esta misma respuesta.
    return serialize(TaskDetailTransformer.transform(task, toCalendarDay(today)))
  }
}
