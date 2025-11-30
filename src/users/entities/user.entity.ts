import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Post } from '../../posts/entities/post.entity';

export interface CreationUserAttrs {
  name: string;
}

@Table
export class User extends Model<User, CreationUserAttrs> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @HasMany(() => Post)
    posts: Post[];
}