import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Model } from 'mongoose';
import { Todo } from '../schemas/todo.schemas';
export declare class TodoService {
    private todoModel;
    constructor(todoModel: Model<Todo>);
    createUser(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    create(createTodoDto: CreateTodoDto, id: string): Promise<import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(id: string): Promise<(import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findOneByEmail(email: string): Promise<import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<{
        success: boolean;
        message: string;
        data: import("mongoose").Document<unknown, {}, Todo> & Todo & Required<{
            _id: unknown;
        }> & {
            __v: number;
        };
    }>;
    remove(id: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
