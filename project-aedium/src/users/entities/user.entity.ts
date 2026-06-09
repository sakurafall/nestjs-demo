import {
  Entity,
  PrimaryKey,
  Property,
  OneToMany,
} from '@mikro-orm/decorators/legacy';
import { Article } from 'src/articles/entities/article.entity';
import { Collection } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  username: string;

  @Property({ unique: true })
  email: string;

  @Property({ type: 'text' })
  password: string;

  @OneToMany(() => Article, (article) => article.author, { nullable: true })
  articles = new Collection<Article>(this);

  @Property({ type: 'text', nullable: true })
  refreshToken?: string;
}
