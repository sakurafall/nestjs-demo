import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, EntityRepository } from '@mikro-orm/postgresql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  // 注释：使用 EntityManager 和 EntityRepository 来操作数据库
  constructor(
    private readonly em: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);

    await this.em.flush()

    return user;
  }

  // async findAll() {
  //   const users = this.userRepository.findAll();

  //   await this.em.flush()

  //   return users;
  // }

  async findOne(email: string) {
    const user = await this.userRepository.findOne({email})

    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
