import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { User } from './entities/user.entity';

function notFoundUser(id: string) {
  throw new NotFoundException(`User with ID=${id} not found`);
}

@Injectable()
export class UsersService {
  @InjectRepository(User)
  userRepository: Repository<User>;

  create(createUserDto: CreateUserDTO) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll(limit: number, offset: number) {
    return this.userRepository.find({
      skip: offset,
      take: limit,
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) notFoundUser(id);
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDTO) {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });
    if (!user) notFoundUser(id);
    return this.userRepository.save(user);
  }

  async remove(id: string) {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) notFoundUser(id);
    return this.userRepository.remove(user);
  }
}
