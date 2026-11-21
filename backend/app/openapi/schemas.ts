import { TASK_STATUSES } from '#models/task'
import { ApiProperty, ApiPropertyOptional } from '@foadonis/openapi/decorators'

/**
 * Los esquemas que más de una operación de tareas devuelve. Cada clase se
 * publica una sola vez en `components.schemas`, con su nombre de clase, y las
 * respuestas la referencian.
 *
 * Solo describen: ninguna se instancia ni valida nada. Lo que la API devuelve
 * de verdad lo deciden los transformers de `app/transformers/` y el manejador
 * de errores; si uno de ellos cambia, este fichero tiene que cambiar con él.
 */

/** Lo que una tarea cuenta de su responsable: `TaskAssigneeTransformer`. */
export class TaskAssignee {
  @ApiProperty({ type: 'integer' })
  declare id: number

  @ApiProperty({
    type: 'string',
    nullable: true,
    description: 'Nulo si la cuenta se registró sin nombre.',
  })
  declare fullName: string | null

  @ApiProperty({ type: 'string', example: 'AL' })
  declare initials: string
}

/** Una tarea tal como sale de la lista, al crearla y al cambiar su estado: `TaskTransformer`. */
export class Task {
  @ApiProperty({ type: 'integer' })
  declare id: number

  @ApiProperty({ type: 'string', maxLength: 200 })
  declare title: string

  @ApiProperty({ enum: [...TASK_STATUSES] })
  declare status: string

  @ApiProperty({ type: 'string', format: 'date-time' })
  declare createdAt: string

  @ApiProperty({ type: 'string', format: 'date-time' })
  declare updatedAt: string

  @ApiProperty({ type: () => TaskAssignee })
  declare assignee: TaskAssignee
}

/**
 * Una tarea con su vencimiento: `TaskDetailTransformer`. Es un esquema aparte
 * porque la lista no lleva estos dos campos.
 */
export class TaskDetail extends Task {
  @ApiProperty({
    type: 'string',
    format: 'date',
    nullable: true,
    description: 'Día del calendario (AAAA-MM-DD), sin hora. Nulo si la tarea no tiene fecha.',
  })
  declare dueDate: string | null

  @ApiProperty({
    type: 'boolean',
    description:
      'Si está vencida para el día `today` indicado en la petición: tiene fecha, esa fecha es anterior a `today` y no está hecha.',
  })
  declare isOverdue: boolean
}

/** El envoltorio `{ data }` que añade `serialize()`, uno por forma de respuesta. */
export class TaskResponse {
  @ApiProperty({ type: () => Task })
  declare data: Task
}

export class TaskListResponse {
  @ApiProperty({ type: () => [Task] })
  declare data: Task[]
}

export class TaskDetailResponse {
  @ApiProperty({ type: () => TaskDetail })
  declare data: TaskDetail
}

/** Un error de VineJS sobre un campo concreto. */
export class FieldError {
  @ApiProperty({ type: 'string' })
  declare message: string

  @ApiProperty({ type: 'string', example: 'required' })
  declare rule: string

  @ApiProperty({ type: 'string', example: 'title' })
  declare field: string

  @ApiPropertyOptional({
    type: 'object',
    description: 'Datos de la regla, p. ej. `choices` en un enum.',
  })
  declare meta?: Record<string, unknown>
}

/** 422: la petición no supera el validador. */
export class ValidationErrorResponse {
  @ApiProperty({ type: () => [FieldError] })
  declare errors: FieldError[]
}

export class ErrorMessage {
  @ApiProperty({ type: 'string', example: 'Unauthorized access' })
  declare message: string
}

/** 401: falta el token o no es válido. */
export class UnauthorizedResponse {
  @ApiProperty({ type: () => [ErrorMessage] })
  declare errors: ErrorMessage[]
}

/**
 * 404: la tarea no existe. Fuera de producción el manejador de errores añade
 * la traza y otros campos de depuración; `message` es lo único estable.
 */
export class NotFoundResponse {
  @ApiProperty({ type: 'string', example: 'Row not found' })
  declare message: string
}
