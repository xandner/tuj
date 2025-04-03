import { Category } from 'src/category/entities/category.entity';
import { Company } from 'src/company/entities/company.entity';
import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({nullable:false})
  productName: string;

  @Column({nullable:false})
  @Index()
  barcode:string

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
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @ManyToOne(() => Category, (category) => category.products, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'category_id' }) // custom column name
  category: Category;
}
