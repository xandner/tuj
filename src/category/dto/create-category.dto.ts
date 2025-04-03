import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({
    name: 'categoryName',
    example: 'category-1',
  })
  @IsString()
  @IsNotEmpty()
  categoryName: string;
}
