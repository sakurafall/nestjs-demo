import type { Response } from 'express';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
export declare class TodoController {
    private readonly todoService;
    constructor(todoService: TodoService);
    findAll(): import("./entities/todo.entity").Todo[];
    findOne(id: number): import("./entities/todo.entity").Todo | undefined;
    create(body: CreateTodoDto): CreateTodoDto;
    update(id: number, updateTodoBody: UpdateTodoDto): UpdateTodoDto;
    delete(id: number, response: Response): Response<any, Record<string, any>> | {
        message: string;
    };
}
