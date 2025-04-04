import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { throttle } from 'rxjs';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async create(createCompanyData: CreateCompanyDto): Promise<Company> {
    try {
      const company = this.companyRepository.create({
        ...createCompanyData,
      });
      return await this.companyRepository.save(company);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Company[]> {
    try {
      return await this.companyRepository.find();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findOne(id: number): Promise<Company> {
    try {
      let company = await this.cacheManager.get<Company>(`company_${id}`);
      if (company) return company;
      company = await this.companyRepository.findOne({
        where: { id },
      });
      if (!company) throw new NotFoundException('Company not found');
      await this.cacheManager.set(`company_${id}`, company);
      return company;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async update(
    id: number,
    updateCompanyData: UpdateCompanyDto,
  ): Promise<Company> {
    try {
      const company = await this.findOne(id);
      if (!company) {
        throw new NotFoundException(`Company with ID ${id} not found`);
      }

      // Merge the updates into the existing company
      const updatedCompany = this.companyRepository.merge(
        company,
        updateCompanyData,
      );

      // Save the updated company
      return await this.companyRepository.save(updatedCompany);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async remove(id: number): Promise<void> {
    try {
      await this.companyRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
