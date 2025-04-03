import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';

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

  findAll() {
    return `This action returns all company`;
  }

  async findOne(id: number) :Promise<Company>{
    try {
      return await this.companyRepository.findOne({
        where:{id}
      })
    } catch (error) {
      throw new NotFoundException("Category not found")
    }
  }

  update(id: number, updateCompanyDto: UpdateCompanyDto) {
    return `This action updates a #${id} company`;
  }

  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
