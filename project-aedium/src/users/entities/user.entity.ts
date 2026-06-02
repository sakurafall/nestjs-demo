import { Entity, PrimaryKey, Property } from '@mikro-orm/decorators/legacy';

@Entity()
export class User {
  @PrimaryKey()
  id: number;

  @Property()
  username: string

  @Property({ unique: true })
  email: string;

  @Property()
  password: string;
}
