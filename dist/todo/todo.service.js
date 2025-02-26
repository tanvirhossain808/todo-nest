"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const todo_schemas_1 = require("../schemas/todo.schemas");
let TodoService = class TodoService {
    constructor(todoModel) {
        this.todoModel = todoModel;
    }
    async createUser(email, password) {
        const newUser = new this.todoModel({ email, password });
        return newUser.save();
    }
    async create(createTodoDto, id) {
        const newUser = new this.todoModel({ ...createTodoDto, user: id });
        return newUser.save();
    }
    async findAll(id) {
        const allUser = await this.todoModel
            .find({ user: id })
            .select('id title description completed');
        return allUser;
    }
    async findOne(id) {
        const currentUser = await this.todoModel.findById(id);
        console.log(currentUser, 'nul');
        if (!currentUser)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        return currentUser;
    }
    async findOneByEmail(email) {
        const currentUser = await this.todoModel.findOne({ email });
        if (!currentUser)
            throw new common_1.NotFoundException(`User not found with email ${email}`);
        console.log(currentUser, 'currentUser');
        return currentUser;
    }
    async update(id, updateTodoDto) {
        const updatedUser = await this.todoModel.findByIdAndUpdate(id, updateTodoDto, {
            new: true,
        });
        if (!updatedUser)
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        return updatedUser;
    }
    async remove(id) {
        const deletedTodo = await this.todoModel.findByIdAndDelete(id);
        if (!deletedTodo) {
            throw new common_1.NotFoundException(`Todo with ID ${id} not found`);
        }
        return deletedTodo;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(todo_schemas_1.Todo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], TodoService);
//# sourceMappingURL=todo.service.js.map