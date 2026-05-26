import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
export declare class TodoService {
    todos: Todo[];
    findAllTodos(): Todo[];
    findOneTodo(id: number): Todo | undefined;
    createTodo(newTodo: CreateTodoDto): CreateTodoDto;
    updateTodo(id: number, updateTodo: UpdateTodoDto): UpdateTodoDto;
    deleteTodo(id: number): boolean;
}
