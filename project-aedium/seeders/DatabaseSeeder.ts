import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { UserFactory } from './UserFactory';

// 关键注释：继承 Seeder 类，并实现 run 方法
export class DatabaseSeeder extends Seeder {

  async run(em: EntityManager): Promise<void> {
    // 在这里编写种子数据插入的逻辑
    new UserFactory(em).create(10);
  }
}
