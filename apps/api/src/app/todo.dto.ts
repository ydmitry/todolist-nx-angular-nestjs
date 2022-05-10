import { Todo, TodoTask } from '@todolist-app/api-interfaces';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TodoTaskDto implements TodoTask {
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateTodoDto implements Omit<Todo, 'id'> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => TodoTaskDto)
  tasks?: TodoTaskDto[];
}

export class TodoDto extends CreateTodoDto implements Todo {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
