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
        barcode: createProductData.barcode,
      });
      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Product[]> {
    try {
      return await this.productRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { id },
      });
      if (!product) throw new NotFoundException('Product not found');
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateProductData: UpdateProductDto,
  ): Promise<Product> {
    try {
      const product = await this.findOne(id);
      if (product.company.id !== updateProductData.companyId) {
        const company = await this.companyService.findOne(
          updateProductData.companyId,
        );
        product.company = company;
      }

      if (product.category.id !== updateProductData.categoryId) {
        const category = await this.categoryService.findOne(
          updateProductData.categoryId,
        );
        product.category = category;
      }

      product.productName = updateProductData.productName;
      product.barcode = updateProductData.barcode;

      return await this.productRepository.save(product);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.productRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findByBarcode(barcode: string): Promise<Product> {
    try {
      const product = await this.productRepository.findOne({
        where: { barcode },
      });
      if (!product) throw new NotFoundException('Barcode not exists');
      return product;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
