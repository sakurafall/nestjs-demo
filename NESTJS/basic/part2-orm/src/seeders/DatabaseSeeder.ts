import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { TodoFactory } from './TodoFactory';
import { UserFactory } from './UserFactory';

// 关键注释：继承 Seeder 类，并实现 run 方法
export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    new TodoFactory(em).create(10);
    new UserFactory(em).create(10);
  }
}
