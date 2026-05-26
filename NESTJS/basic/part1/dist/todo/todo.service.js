"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoService = void 0;
const common_1 = require("@nestjs/common");
let TodoService = class TodoService {
    todos = [
        {
            id: 1,
            title: 'Todo 1',
            content: 'Content 1',
            isCompleted: false,
        },
        {
            id: 2,
            title: 'Todo 2',
            content: 'Content 2',
            isCompleted: false,
        },
        {
            id: 3,
            title: 'Todo 3',
            content: 'Content 3',
            isCompleted: false,
        },
    ];
    findAllTodos() {
        return this.todos;
    }
    findOneTodo(id) {
        return this.todos.find((todo) => Number(todo.id) === Number(id));
    }
    createTodo(newTodo) {
        this.todos.push({ id: Date.now(), ...newTodo });
        return newTodo;
    }
    updateTodo(id, updateTodo) {
        this.todos = this.todos.map((todo) => {
            if (Number(todo.id) === Number(id)) {
                return {
                    ...todo,
                    ...updateTodo,
                };
            }
            return todo;
        });
        return updateTodo;
    }
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => Number(todo.id) !== Number(id));
        return true;
    }
};
exports.TodoService = TodoService;
exports.TodoService = TodoService = __decorate([
    (0, common_1.Injectable)()
], TodoService);
//# sourceMappingURL=todo.service.js.map