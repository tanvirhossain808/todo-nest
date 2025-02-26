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
    return this.todoService.create(createTodoDto, request.user.sub);
  }

  @Get()
  async findAll(@Req() request: CustomRequest) {
    console.log(request.user, 'request');
    return this.todoService.findAll(request.user.sub);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() request: CustomRequest) {
    console.log(request?.user?.sub);
    return this.todoService.findOne(id, request?.user?.sub);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTodoDto: UpdateTodoDto,
    @Req() request: CustomRequest,
  ) {
    await this.todoService.findOne(id, request?.user?.sub);
    return this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() request: CustomRequest) {
    // console.log(first)
    await this.todoService.findOne(id, request?.user?.sub);
    return this.todoService.remove(id);
  }
}
