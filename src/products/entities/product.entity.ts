import { ProductImage } from './product-image.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/auth/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'products' })
export class Product {
  @ApiProperty({
    example: '0bca7caa-9791-459b-aa48-80e0d668b682',
    description: 'product id',
    uniqueItems: true,
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @ApiProperty({
    example: 'camiseta',
    description: 'product title',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  title: string;
  @ApiProperty({
    example: 0,
    description: 'product price',
  })
  @Column('float', {
    default: 0,
  })
  price: number;
  @ApiProperty({
    example: 'description',
    description: 'product dfescription',
    default: null,
  })
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;
  @ApiProperty({
    example: 'teslo tshirt',
    description: 'product slug',
    uniqueItems: true,
  })
  @Column('text', {
    unique: true,
  })
  slug: string;
  @ApiProperty({
    example: 10,
    description: 'product stock',
    default: 0,
  })
  @Column('int', {
    default: 0,
  })
  stock: number;
  @ApiProperty({
    example: ['m', 'l', 'xl'],
    description: 'product sizes',
  })
  @Column('text', {
    array: true,
  })
  sizes: string[];
  @ApiProperty({
    example: 'women',
    description: 'product gender',
  })
  @Column('text')
  gender: string;
  @ApiProperty()
  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];
  @ApiProperty()
  @OneToMany(() => ProductImage, (productImage) => productImage.product, {
    cascade: true,
    eager: true,
  })
  images?: ProductImage[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  //many to one
  @ManyToOne(() => User, (user) => user.product, { eager: true })
  user: User;

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
