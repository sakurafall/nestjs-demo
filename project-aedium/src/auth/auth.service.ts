import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entities/user.entity';

const HASH_ROUNDS = 10;

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    // Check if user exists
    const user = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    // Check if  password is correct
    const compareResult = await bcrypt.compare(pass, user.password);
    if (!compareResult) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens and return them
    return await this.issueTokens(user);
  }

  async signUp(
    email: string,
    pass: string,
  ): Promise<{ access_token: string; refresh_token: string }> {
    // Check if user already exists
    const user = await this.usersService.findUserByEmail(email);
    if (user) {
      throw new UnauthorizedException('User with this email already exists');
    }

    // Hash the passsword
    const hashedPassword = await bcrypt.hash(pass, HASH_ROUNDS);

    // Create the user
    const createdUser = await this.usersService.create({
      email,
      password: hashedPassword,
    });

    // Generate tokens and return them
    return await this.issueTokens(createdUser);
  }

  // Issue tokens to the user
  private async issueTokens(user: User) {
    // Generate JWT
    const tokens = await this.generateTokenByUser(user);

    // Hash the refresh token
    const hashedRefreshToken = await bcrypt.hash(
      tokens.refresh_token,
      HASH_ROUNDS,
    );

    // Update the user with the hashed refresh token
    await this.usersService.update(user.id, {
      refreshToken: hashedRefreshToken,
    });

    return tokens;
  }

  // Generate tokens by user
  private async generateTokenByUser(user: User) {
    // Define secrets
    const accessSecret = process.env.JWT_ACCESS_SECRET;
    const refreshSecret = process.env.JWT_REFRESH_SECRET;
    if (!accessSecret || !refreshSecret) {
      throw new Error('JWT_SECRET is not set');
    }

    // Generate a JWT and return it here
    const payload = { sub: user.id, email: user.email };
    const tokens = {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: accessSecret,
      }),
      refresh_token: await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret: refreshSecret,
      }),
    };

    return tokens;
  }
}
