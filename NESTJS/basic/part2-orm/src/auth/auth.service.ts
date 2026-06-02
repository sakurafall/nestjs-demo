import {
  ConflictException,
  NotFoundException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  // 注释：注入用户服务和 JWT 服务
  constructor(private readonly usersService: UsersService, private readonly jwtService: JwtService) {}

  // 注释：生成用户令牌
  private async generateUserToken(user: { id: number, email: string }): Promise<{ access_token: string }> {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload)
    }
  }

  // 注释：登录
  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);

    // 注释：如果用户不存在, 抛出异常
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // 注释：比较密码
    const comparedResult = await bcrypt.compare(pass, user.password);

    // 注释：如果密码不匹配, 抛出异常
    if (!comparedResult) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 注释：生成用户令牌
    return this.generateUserToken(user);
  }

  // 注释：注册
  async signUp(email: string, password: string): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(email);
    if (user) {
      throw new ConflictException('User with this email already exists');
    }

    // 注释：哈希密码, 创建用户
    const hashedPassword = await bcrypt.hash(password, 10);

    // 注释：创建用户
    const newUser = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // 注释：生成用户令牌
    return this.generateUserToken(newUser);
  }
}
