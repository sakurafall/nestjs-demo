import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
    private readonly em: EntityManager,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({
      ...createUserDto,
      username: faker.lorem.words(2)
    })

    await this.em.flush()

    return user
  }

  // Admin
  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(
      { id },
      {
        populate: ['articles'],
        // fields: ['id', 'username', 'email', 'articles'],
        exclude: [
          'password',
          'articles.content',
          'articles.createdAt',
          'articles.updatedAt',
        ],
      },
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async findUserByEmail(email: string) {
    const user = this.userRepository.findOne({ email });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    this.em.assign(user, updateUserDto);

    await this.em.flush();

    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
