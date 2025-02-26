/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
} from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CustomRequest } from 'src/common/decorators/interfaces/custom-request.interface';

@Controller('todo')
export class TodoController {
  constructor(private todoService: TodoService) {}
  @Post()
  async create(
    @Body() createTodoDto: CreateTodoDto,
    @Req() request: CustomRequest,
  ) {
    console.log(request.user);
    return this.todoService.create(createTodoDto, request.user.sub);
  }

  @Get()
  async findAll(@Req() request: CustomRequest) {
    console.log(request.user, 'request');
    return this.todoService.findAll(request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(id);
  }
}
