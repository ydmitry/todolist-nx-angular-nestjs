import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { DataProviderService } from './data-provider.service';
import { CreateTodoDto, TodoDto } from './todo.dto';

@Controller()
export class AppController {
  constructor(private readonly dataProvider: DataProviderService) {}

  @Get('todos')
  async getAll() {
    return await this.dataProvider.getAll();
  }

  @Get('todos/:id')
  async get(@Param('id') id: number) {
    const todo = await this.dataProvider.get(id);

    if (!todo) {
      throw new NotFoundException('Invalid Todo');
    }

    return todo;
  }

  @Post('todos')
  async post(@Body() todo: CreateTodoDto) {
    return await this.dataProvider.create(todo);
  }

  @Put('todos/:id')
  async put(@Param('id') id: number, @Body() todo: TodoDto) {
    try {
      return await this.dataProvider.update(id, todo);
    } catch (e) {
      throw new BadRequestException(e);
    }
  }

  @Delete('todos/:id')
  async delete(@Param('id') id: number) {
    return await this.dataProvider.delete(id);
  }
}
