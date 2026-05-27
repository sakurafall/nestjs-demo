import { Migration } from '@mikro-orm/migrations';

export class Migration20260527031952 extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`alter table "todo_new" alter column "content" type text using ("content"::text);`);
  }

  override down(): void | Promise<void> {
    this.addSql(`alter table "todo_new" alter column "content" type varchar(255) using ("content"::varchar(255));`);
  }

}
