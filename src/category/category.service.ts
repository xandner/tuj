import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryData: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create({
        categoryName: createCategoryData.categoryName,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      const category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category) throw new NotFoundException('Category not exists');
      return category;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.categoryRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
