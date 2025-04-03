import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
    @ApiProperty({
        name:"companyName",
        example:"company-1"
    })
    @IsString()
    @IsNotEmpty()
    companyName:string
}
