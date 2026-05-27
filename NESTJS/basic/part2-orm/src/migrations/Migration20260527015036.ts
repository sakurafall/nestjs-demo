import { Migration } from '@mikro-orm/migrations';

export class Migration20260527015036 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "todo_new" ("id" serial primary key, "title" varchar(255) not null, "content" varchar(255) not null, "is_completed" boolean not null);`);

    this.addSql(`drop table if exists "todo" cascade;`);
  }

  override down(): void | Promise<void> {
    this.addSql(`create table "todo" ("content" varchar(255) not null, "id" serial primary key, "is_completed" boolean not null, "title" varchar(255) not null);`);

    this.addSql(`drop table if exists "todo_new" cascade;`);
  }

}
