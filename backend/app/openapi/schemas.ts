import { ApiProperty, ApiPropertyOptional } from '@foadonis/openapi/decorators'
import { TASK_STATUSES } from '#models/task'

/**
 * Esquemas OpenAPI compartidos de tasks. Se publican en `components.schemas`
 * al referenciarse desde las respuestas de los controladores.
 */

export class TaskAssigneeSchema {
  @ApiProperty({ type: 'number' })
  declare id: number

  @ApiPropertyOptional({ type: 'string', nullable: true })
  declare fullName: string | null

  @ApiProperty({ type: 'string' })
  declare initials: string
}

export class TaskSchema {
  @ApiProperty({ type: 'number' })
  declare id: number

  @ApiProperty({ type: 'string' })
  declare title: string

  @ApiProperty({ enum: [...TASK_STATUSES] })
  declare status: (typeof TASK_STATUSES)[number]

  @ApiProperty({ type: () => TaskAssigneeSchema })
  declare assignee: TaskAssigneeSchema

  @ApiProperty({ type: 'string', format: 'date-time' })
  declare createdAt: string

  @ApiProperty({ type: 'string', format: 'date-time' })
  declare updatedAt: string
}

export class TaskDetailSchema extends TaskSchema {
  @ApiPropertyOptional({ type: 'string', format: 'date', nullable: true })
  declare dueDate: string | null

  @ApiProperty({ type: 'boolean' })
  declare isOverdue: boolean
}

export class TaskListDataSchema {
  @ApiProperty({ type: () => [TaskSchema] })
  declare data: TaskSchema[]
}

export class TaskDataSchema {
  @ApiProperty({ type: () => TaskSchema })
  declare data: TaskSchema
}

export class TaskDetailDataSchema {
  @ApiProperty({ type: () => TaskDetailSchema })
  declare data: TaskDetailSchema
}

export class CreateTaskBodySchema {
  @ApiProperty({ type: 'string', minLength: 1, maxLength: 200 })
  declare title: string
}

export class UpdateTaskStatusBodySchema {
  @ApiProperty({ enum: [...TASK_STATUSES] })
  declare status: (typeof TASK_STATUSES)[number]
}

export class SetTaskDueDateBodySchema {
  @ApiProperty({ type: 'string', format: 'date' })
  declare today: string

  @ApiPropertyOptional({ type: 'string', format: 'date', nullable: true })
  declare dueDate: string | null
}

export class ValidationErrorItemSchema {
  @ApiProperty({ type: 'string' })
  declare message: string

  @ApiPropertyOptional({ type: 'string' })
  declare rule?: string

  @ApiPropertyOptional({ type: 'string' })
  declare field?: string
}

export class ValidationErrorBodySchema {
  @ApiProperty({ type: () => [ValidationErrorItemSchema] })
  declare errors: ValidationErrorItemSchema[]
}

export class UnauthorizedErrorBodySchema {
  @ApiProperty({ type: () => [ValidationErrorItemSchema] })
  declare errors: ValidationErrorItemSchema[]
}
