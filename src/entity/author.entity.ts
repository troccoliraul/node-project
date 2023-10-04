import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { Book } from "./book.entity";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
@Entity()
export class Author {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  fullName!: string;

  @Field(() => [Book]) // Usar un array para representar una relación uno a muchos
  @OneToMany(() => Book, (book) => book.author, { nullable: true })
  books!: Book[];

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;
}
