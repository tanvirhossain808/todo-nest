/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
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
  async create(createTodoDto: CreateTodoDto, id: string) {
    const newUser = new this.todoModel({ ...createTodoDto, user: id });
    return newUser.save();
  }

  async findAll(id: string) {
    const allUser = await this.todoModel
      .find({ user: id })
      .select('id title description completed');
    return allUser;
  }

  async findOne(id: string, userId: string | undefined) {
    console.log(userId, 'userId');
    const currentUser = await this.todoModel.findById(id);
    console.log(currentUser, 'cr');
    if (!currentUser)
      throw new NotFoundException(`Todo with ID ${id} not found`);
    if (userId !== currentUser?.user) {
      throw new NotFoundException(`You are not authorized to access this todo`);
    }
    return currentUser;
  }
  async findOneByEmail(email: string) {
    const currentUser = await this.todoModel.findOne({ email });
    if (!currentUser)
      throw new NotFoundException(`User not found with email ${email}`);
    console.log(currentUser, 'currentUser');
    return currentUser;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto) {
    const updatedUser = await this.todoModel.findByIdAndUpdate(
      id,
      updateTodoDto,
      {
        new: true,
      },
    );
    if (!updatedUser)
      throw new NotFoundException(`Todo with ID ${id} not found`);
    return {
      success: true,
      message: `User with ID ${id} has been successfully updated`,
      data: updatedUser,
    };
  }

  async remove(id: string) {
    const deletedTodo = await this.todoModel.findByIdAndDelete(id);

    if (!deletedTodo) {
      throw new NotFoundException(`Todo with ID ${id} not found`);
    }

    return {
      success: true,
      message: `User with ID ${id} has been successfully deleted`,
    };
  }
}
