import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { TodoNew } from '../todos/entities/todo.entity';

export class TodoFactory extends Factory<TodoNew> {
  model = TodoNew;

  definition(): Partial<TodoNew> {
    return {
      // title: faker.lorem.sentence(),
      title: faker.book.title(),
      content: faker.lorem.paragraph(),
      isCompleted: faker.datatype.boolean(),
    };
  }
}