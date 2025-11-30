import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

export interface CreationPostAttrs {
    title: string;
    content: string;
    userId: number;
}

@Table
export class Post extends Model<Post, CreationPostAttrs> {

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'

    })
    userId: number;

    @BelongsTo(() => User, {
        onDelete: 'RESTRICT',
        onUpdate: 'CASCADE'
    })
    user: User;
}