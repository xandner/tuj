import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @OneToOne(() => Company, (company) => company.product)
  company: Company;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false, // Product must have a category
    eager: true, // optional: always load the category with product
  })
  @JoinColumn({ name: 'category_id' }) // custom column name
  category: Category;
}
