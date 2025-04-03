import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    name: 'productName',
    example: 'product-1',
  })
  @IsNotEmpty()
  @IsString()
  productName: string;

  @ApiProperty({
    name: 'companyId',
  })
  @IsNumber()
  @IsNotEmpty()
  companyId: number;

  @ApiProperty({
    name: 'categoryId',
  })
  @IsNumber()
  @IsNotEmpty()
  categoryId: number;
}
