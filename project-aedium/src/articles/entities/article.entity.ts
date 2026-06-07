import {
  Entity,
  PrimaryKey,
  Property,
  Enum,
  ManyToOne,
} from '@mikro-orm/decorators/legacy';
import { User } from 'src/users/entities/user.entity';
import { OptionalProps } from '@mikro-orm/core';

export enum ArticleStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity()
export class Article {
  // 可选属性：updatedAt, createdAt
  [OptionalProps]?: 'updatedAt' | 'createdAt';

  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property({ type: 'text' })
  content: string;

  @Enum(() => ArticleStatus)
  status: ArticleStatus;

  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  @ManyToOne()
  author!: User;
}
