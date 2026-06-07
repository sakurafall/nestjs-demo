import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';

import { UserFactory } from './UserFactory';
import { ArticleFactory } from './ArticleFactory';

// 关键注释：继承 Seeder 类，并实现 run 方法
export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // 在这里编写种子数据插入的逻辑
    new UserFactory(em)
      .each((user) => {
        const articleCount = faker.number.int({ min: 0, max: 3 });

        if (!articleCount) return;

        user.articles.set(new ArticleFactory(em).make(articleCount));
      })
      .make(10);
  }
}
