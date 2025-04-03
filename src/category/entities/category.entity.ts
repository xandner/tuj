import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category, {
    cascade: true, // optional: automatically save related products
    onDelete: 'CASCADE', // optional: delete products when category is deleted
  })
  products: Product[];
}
