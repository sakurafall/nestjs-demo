import { Entity, PrimaryKey, Property } from "@mikro-orm/decorators/legacy";

@Entity()
export class TodoNew {
  @PrimaryKey()
  id: number

  @Property()
  title: string

  @Property({ type: 'text' })
  content: string

  @Property()
  isCompleted: boolean
}
