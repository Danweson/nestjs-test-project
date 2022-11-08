import { Body, Controller, Delete, Get, HttpStatus, NotFoundException, Param, ParseIntPipe, Post, Put, Query, Req, Res, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { count } from 'console';
import { Request, Response} from 'express';
import { identity } from 'rxjs';
import { Todo } from 'src/entities/todo.entity';
import { DurationInterceptor } from 'src/interceptors/duration.interceptor';
import { threadId } from 'worker_threads';
import { AddTodoDto } from './dto/add-todo-totdo';
import { GetPaginatedTodoDto } from './dto/get-paginated-todo.dto';
import { TodoService } from './todo.service';

// @UseInterceptors(DurationInterceptor)
@Controller('todo')
export class TodoController {

    constructor(private todoService: TodoService){ 
      
    }

    @Get()
    getTodos(@Query() myQueryParams : GetPaginatedTodoDto): Todo[]{
        // console.log(myQueryParams instanceof GetPaginatedTodoDto);
        // console.log("Fetch Todo List");
        return this.todoService.getTodos();
    } 
    @Get("v2")
    getTodosV2(@Req() request: Request, @Res() response: Response){
        // console.log(request);
        // console.log("Fetch Todo List");
        // console.log(response);
        // response.status(200);
        response.json({
            content: `I am a response generated from Express Response object`
        });
    }

    @Get('/:id')
    getTodoById(@Param('id', new ParseIntPipe(
        {
            errorHttpStatusCode: HttpStatus.NOT_FOUND
        }
        )) id){
       return this.todoService.getTodoById(id)
    }

    @Post()
   addTodos( @Body(ValidationPipe) newTodo:AddTodoDto
   ): Todo{
    //   console.log(newTodo)
      return this.todoService.addTodo(newTodo);
    }

    @Put(':id')
    updateTodo(
        @Param('id', ParseIntPipe) id,
        @Body() newTodo: Partial<Todo>
    ){
        return this.todoService.updateTodo(id, newTodo)
    }

    @Delete(':id')
    deleteTodos(@Param('id', ParseIntPipe) id){
        // console.log(typeof id)
        return this.todoService.deleteTodo(id);
    }
}
