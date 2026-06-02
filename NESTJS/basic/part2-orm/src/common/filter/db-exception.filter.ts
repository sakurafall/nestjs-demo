import {
  Catch,
  HttpStatus,
  ArgumentsHost,
  ExceptionFilter,
} from '@nestjs/common';
import {
  DriverException,
  CheckConstraintViolationException,
  UniqueConstraintViolationException,
} from '@mikro-orm/core';
import type { Response } from 'express';

// 常量：数据库异常对应的HTTP状态码和消息
const DB_HTTP_MAP: Record<string, { status: number; message: string }> = {
  // 唯一约束冲突异常
  UniqueConstraintViolationException: {
    status: HttpStatus.CONFLICT,
    message: 'Resource already exists',
  },
  // 检查约束冲突异常
  CheckConstraintViolationException: {
    status: HttpStatus.CONFLICT,
    message: 'Check constraint violation',
  },
};

// 注解：捕获数据库异常
@Catch(UniqueConstraintViolationException, CheckConstraintViolationException)
export class DbExceptionFilter<T> implements ExceptionFilter {
  // 方法：捕获数据库异常
  catch(exception: DriverException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 获取请求上下文
    const response = ctx.getResponse<Response>(); // 获取响应对象
    const name = exception.name; // 获取异常名称

    const { status } = DB_HTTP_MAP[name]; // 获取异常对应的HTTP状态码和消息

    response.status(status).json(DB_HTTP_MAP[name]); // 返回异常对应的HTTP状态码和消息
  }
}
