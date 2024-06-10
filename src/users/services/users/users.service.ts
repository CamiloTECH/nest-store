import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/users/dtos/user.dtos';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'email@gmail.com',
      password: '12345',
    },
  ];

  findAll() {
    return this.users;
  }

  findOne(userId: number) {
    const findUser = this.users.find(({ id }) => id === userId);
    if (!findUser) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    return findUser;
  }

  create(user: CreateUserDto) {
    this.counterId++;
    const newUser = {
      id: this.counterId,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(user: UpdateUserDto, userId: number) {
    const updateIndex = this.users.findIndex(({ id }) => id === userId);
    if (updateIndex === -1) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const userUpdate = this.users[updateIndex];
    this.users[updateIndex] = {
      ...userUpdate,
      ...user,
    };
    return this.users[updateIndex];
  }

  delete(userId: number) {
    const deleteIndex = this.users.findIndex(({ id }) => id === userId);
    if (deleteIndex === -1) {
      throw new NotFoundException(`User ${userId} not found`);
    }
    this.users.splice(deleteIndex, 1);
    return true;
  }
}
