import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @ApiProperty({
    name:"id"
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    name:"categoryName"
  })
  @Column()
  categoryName: string;

  @ApiProperty({
    name:"createdAt"
  })
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @ApiProperty({
    name:"updatedAt"
  })
  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    name:"products",
    isArray:true
  })
  @OneToMany(() => Product, (product) => product.category, {
    cascade: true, // optional: automatically save related products
    onDelete: 'CASCADE', // optional: delete products when category is deleted
  })
  products: Product[];
}
