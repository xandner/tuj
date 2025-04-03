import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { throttle } from 'rxjs';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
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
      return await this.companyRepository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Category not found');
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
