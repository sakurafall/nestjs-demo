import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

// 数据库模块
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '../mikro-orm.config';

// 日志模块
import { LoggerModule } from 'nestjs-pino';

// 认证模块
import { AuthModule } from './auth/auth.module';

// 配置模块
import pinoHttpConfig from './common/config/pino';

// 限流模块
import { ThrottlerModule } from '@nestjs/throttler';
import { rateLimitConfigs } from './common/config/rate-limit';

import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

@Module({
  imports: [
    UsersModule,
    TodosModule,
    MikroOrmModule.forRoot(config),
    AuthModule,
    LoggerModule.forRoot({
      pinoHttp: pinoHttpConfig,
    }),
    ThrottlerModule.forRoot(rateLimitConfigs),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
