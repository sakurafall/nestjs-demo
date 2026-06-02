import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Query,
  // UseGuards
} from '@nestjs/common';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
// import { AuthGuard } from 'src/auth/guard/auth.guard';
// import { Public } from 'src/auth/decorator/public.decorator';

@Controller('todo')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todosService.create(createTodoDto);
  }

  // @UseGuards(AuthGuard)
  @Get()
  // @Public()
  findAll(@Query() filterTodoDto: FilterTodoDto) {
    return this.todosService.findAll(filterTodoDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.todosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.todosService.remove(id);
  }
}
