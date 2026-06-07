import { Factory } from '@mikro-orm/seeder';
import { faker } from '@faker-js/faker';
import { Article } from '../src/articles/entities/article.entity';
import { ArticleStatus } from '../src/articles/entities/article.entity';

export class ArticleFactory extends Factory<Article> {
  model = Article;

  definition(): Partial<Article> {
    return {
      title: faker.book.title(),
      content: faker.lorem.lines(1),
      status: faker.helpers.enumValue(ArticleStatus),
    };
  }
}