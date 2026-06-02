import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import { AppModule } from './app.module';
import { DbExceptionFilter } from './common/filter/db-exception.filter';

import helmet from 'helmet';

async function bootstrap() {
  // 创建应用实例: express 版本
  const app = await NestFactory.create(AppModule);

  // 创建应用实例: fastify 版本
  // const app = await NestFactory.create<NestFastifyApplication>(
  //   AppModule,
  //   new FastifyAdapter()
  // );

  // 注释：使用helmet保护应用
  app.use(helmet());
  
  // 注释：swagger
  const config = new DocumentBuilder()
    .setTitle('Todos example')
    .setDescription('The Todos API description')
    .setVersion('1.0')
    .addTag('Todos')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  // 注解：全局管道
  // 关键注释：验证请求体中的数据
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // 将请求体中的数据转换为DTO对象
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true, // 过滤掉DTO对象中不存在的属性
      forbidNonWhitelisted: true, // 如果请求体中的数据包含DTO对象中不存在的属性，则抛出异常
    }),
  );

  // 注解：使用pino日志
  app.useLogger(app.get(Logger));

  // 注解：全局过滤器
  // 关键注释：捕获数据库异常并返回409状态码
  app.useGlobalFilters(new DbExceptionFilter());

  // 启动应用
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
