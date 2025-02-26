import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { CustomRequest } from 'src/common/decorators/interfaces/custom-request.interface';
export declare class TodoController {
    private todoService;
    constructor(todoService: TodoService);
    create(createTodoDto: CreateTodoDto, request: CustomRequest): Promise<import("mongoose").Document<unknown, {}, import("../schemas/todo.schemas").Todo> & import("../schemas/todo.schemas").Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(request: CustomRequest): Promise<(import("mongoose").Document<unknown, {}, import("../schemas/todo.schemas").Todo> & import("../schemas/todo.schemas").Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    })[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/todo.schemas").Todo> & import("../schemas/todo.schemas").Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    update(id: string, updateTodoDto: UpdateTodoDto): Promise<import("mongoose").Document<unknown, {}, import("../schemas/todo.schemas").Todo> & import("../schemas/todo.schemas").Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("../schemas/todo.schemas").Todo> & import("../schemas/todo.schemas").Todo & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
