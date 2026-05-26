import 'dotenv/config';
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  // for simplicity, we use the SQLite database, as it's available pretty much everywhere
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) ?? 5432,

  // log slow queries to a file
  // slowQueryThreshold: 1000,
  // slowQueryLoggerFactory: options => new DefaultLogger({
  //   ...options,
  //   writer: msg => fs.appendFileSync('slow-queries.log', msg + '\n'),
  // }),

  metadataProvider: TsMorphMetadataProvider,

  // Glob patterns for compiled JavaScript files
  entities: ['dist/**/*.entity.js'],
  // Glob patterns for TypeScript source files (used in development)
  entitiesTs: ['src/**/*.entity.ts'],
  // enable debug mode to log SQL queries and discovery information
  debug: true,
});
