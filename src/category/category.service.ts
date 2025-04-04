import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { LoggerService } from 'src/shared/logger/logger.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    private readonly logger: LoggerService,
  ) {}

  async create(createCategoryData: CreateCategoryDto): Promise<Category> {
    try {
      const category = this.categoryRepository.create({
        categoryName: createCategoryData.categoryName,
      });
      return await this.categoryRepository.save(category);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Category[]> {
    try {
      return await this.categoryRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Category> {
    try {
      let category = await this.cacheManager.get<Category>(`category_${id}`);
      if (category) {
        this.logger.log('category found in cache');
        return category;
      }
      category = await this.categoryRepository.findOne({
        where: { id },
      });
      if (!category) throw new NotFoundException('Category not exists');
      await this.cacheManager.set(`category_${id}`, category);
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
