import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodoNew } from './entities/todo.entity';

@Module({
  imports: [MikroOrmModule.forFeature([TodoNew])],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
