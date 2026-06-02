import 'dotenv/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';

export default defineConfig({
  // 指定数据库名称、用户名、密码、主机和端口
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) ?? 5432,

  // sql slow query - (mikro-orm V7 new feature)
  // slowQueryThreshold: 1000,
  // slowQueryLoggerFactory: options => new DefaultLogger({
  //   ...options,
  //   writer: msg => fs.appendFileSync('slow-queries.log', msg + '\n'),
  // }),

  // 注释：Neon DB 需要 SSL 连接(这里手动关闭)
  driverOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },

  // 注释：Seeder 配置，用于定义数据库种子的行为和相关文件路径
  seeder: {
    path: './seeders', // 种子文件的文件夹路径，放置所有的 seeder
    pathTs: undefined, // 可选，TypeScript 源码的 path（一般可省略，编译后由 path 指定）
    defaultSeeder: 'DatabaseSeeder', // 默认执行的 Seeder 类名（入口 Seeder）
    glob: '!(*.d).{js,ts}', // 匹配 .js 和 .ts 后缀的文件，排除 .d.ts 类型声明文件
    emit: 'ts', // 生成 Seeder 模板时的文件类型（ts=TypeScript | js=JavaScript）
    fileName: (className: string) => className, // 生成 Seeder 文件时的命名规则，按类名保存
  },

  // 指定元数据提供者，用于读取 TypeScript 装饰器和类型信息（推荐开发时使用 TsMorphMetadataProvider，性能更高，支持热重载）
  metadataProvider: TsMorphMetadataProvider,

  // 指定实体文件路径，用于告诉 MikroORM 哪些文件是实体类（实体类是数据库表的映射类）
  entities: ['dist/**/*.entity.js'],
  // 指定实体文件路径，用于告诉 MikroORM 哪些文件是实体类（实体类是数据库表的映射类）
  entitiesTs: ['src/**/*.entity.ts'],
  // 启用调试模式，记录 SQL 查询和发现信息（开发时推荐开启，生产环境可关闭）
  debug: true,

  // 注释：mikro-orm扩展 - 在 MikroORM 配置中注册扩展功能
  // Migrator：用于管理数据库迁移（如创建、更新、回滚数据库 schema 的结构变化）
  // SeedManager：用于管理数据库种子（如批量初始化、插入、重置测试数据等）
  extensions: [Migrator, SeedManager],
});
