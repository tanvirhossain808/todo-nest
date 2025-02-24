/* eslint-disable prettier/prettier */
import { HttpException, Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Todo } from '../schemas/todo.schemas';

@Injectable()
export class TodoService {
  constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>) {}
  async createUser(email: string, password: string) {
    const newUser = new this.todoModel({ email, password });
    return newUser.save();
  }
  async create(createTodoDto: CreateTodoDto) {
    const newUser = new this.todoModel(createTodoDto);
    return newUser.save();
  }

  async findAll() {
    const allUser = await this.todoModel.find();
    return allUser;
  }

  async findOne(id: string) {
    const currentUser = await this.todoModel.findById(id);
    if (!currentUser) new HttpException('User not found', 400);
    return currentUser;
  }
  async findOneByEmail(email: string) {
    const currentUser = await this.todoModel.findOne({ email });
    console.log(currentUser, 'currentUser');
    return currentUser;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const updatedUser = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
    );
    return updatedUser;
  }

  async remove(id: string) {
    const removedUser = await this.todoModel.findByIdAndDelete(id);
    return removedUser;
  }
}
