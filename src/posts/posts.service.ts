import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private postModel: typeof Post,
  ) { }

  create(createPostDto: CreatePostDto) {
    return this.postModel.create(createPostDto);
  }

  findAll() {
    return this.postModel.findAll({ include: ['user'] });
  }

  findOne(id: number) {
    return this.postModel.findByPk(id, { include: ['user'] });
  }

  async update(id: number, dto: UpdatePostDto) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Post topilmadi');

    return post.update(dto);
  }

  async remove(id: number) {
    const post = await this.postModel.findByPk(id);
    if (!post) throw new NotFoundException('Post topilmadi');

    await post.destroy();
    return { message: "Post o'chirildi" };
  }
}
