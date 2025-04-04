import { Category } from 'src/category/entities/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class SubCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subCategoryName: string;

  @ManyToOne(() => Category, (category) => category.subCategories, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  category: Category;
}
