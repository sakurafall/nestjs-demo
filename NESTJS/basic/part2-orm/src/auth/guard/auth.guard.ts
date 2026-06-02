import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

// 认证守卫
@Injectable()
export class AuthGuard implements CanActivate {
  // 注释：注入 JWT 服务
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  // 注释：验证请求
  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 注释：检查是否为公共路由
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // 注释：如果为公共路由, 则直接返回 true
    if (isPublic) {
      return true;
    }

    // 注释：获取请求
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // 注释：如果令牌不存在, 抛出异常
    if (!token) {
      throw new UnauthorizedException();
    }

    // 注释：验证令牌
    try {
      const payload = await this.jwtService.verifyAsync(token);
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  // 注释：提取令牌
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
