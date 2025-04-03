import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CompanyService } from 'src/company/company.service';
import { CategoryService } from 'src/category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    private readonly companyService: CompanyService,
    private readonly categoryService: CategoryService,
  ) {}
  async create(createProductData: CreateProductDto) {
    try {
      const company = await this.companyService.findOne(
        createProductData.companyId,
      );

      const category = await this.categoryService.findOne(
        createProductData.categoryId,
      );

      const product = this.productRepository.create({
        company,
        category,
        productName: createProductData.productName,
      });
      return await this.productRepository.save(product)
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all product`;
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
