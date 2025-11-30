import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Post } from 'src/posts/entities/post.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) { }

  create(dto: CreateUserDto) {
    return this.userModel.create(dto);
  }

  findAll() {
    return this.userModel.findAll({ include: ['posts'] });
  }

  findOne(id: number) {
    return this.userModel.findByPk(id, { include: ['posts'] });
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) throw new NotFoundException('User topilmadi');

    return user.update(dto);
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id, { include: [Post] });

    if (!user) throw new NotFoundException('User topilmadi');

    if (user.posts?.length) {
      throw new BadRequestException(
        "Bu userni o'chira olmaysiz, avval postlarini o'chiring"
      );
    }

    await user.destroy();
    return { message: "User o'chirildi" };
  }
}
