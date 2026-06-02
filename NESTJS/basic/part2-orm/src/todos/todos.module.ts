import { Module } from '@nestjs/common';
import { TodosService } from './todos.service';
import { TodosController } from './todos.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TodoNew } from './entities/todo.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [MikroOrmModule.forFeature([TodoNew]), AuthModule],
  controllers: [TodosController],
  providers: [TodosService],
})
export class TodosModule {}
