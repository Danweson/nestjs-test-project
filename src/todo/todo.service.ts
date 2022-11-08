import { Injectable, NotFoundException } from '@nestjs/common';
import { Todo } from 'src/entities/todo.entity';
import { AddTodoDto } from './dto/add-todo-totdo';

@Injectable()
export class TodoService {

    todos: Todo[] = [];

    getTodos(): Todo[] {
        return this.todos;
    }

    addTodo(newTodo: AddTodoDto) : Todo{
       
        let id;
        const {name, description} = newTodo
        if (this.todos.length) {
            id = this.todos[this.todos.length - 1].id + 1
        }else{
            id = 1
        }
        
        const todo = {
            id,
            name,
            description,
            createdAt: new Date()
        };
        this.todos.push(todo);
        return todo;
    }

    getTodoById(id: number): Todo{
        const todo = this.todos.find((actualTodo) =>  actualTodo.id === id);
        if(todo)
            return todo;
        throw new NotFoundException(`Todo id ${id} does not exist.`);
    }

    updateTodo(id: number, newTodo: Partial<Todo>){
        const todo = this.getTodoById(id);
        todo.description = newTodo.description? newTodo.description : todo.description
        todo.name = newTodo.name? newTodo.name : todo.name
        return todo;
    }

    deleteTodo(id: number){
        const index = this.todos.findIndex((todo) => todo.id === + id)
        if (index > 0) {
            this.todos.splice(index, 1)
        }else{
            throw new NotFoundException(`The todo id ${id} does not exist`);
        }

        return {
            message: `The todo id ${id} does not exist`,
            count: 1
        };
    }
}
