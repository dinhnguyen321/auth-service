import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUppercase } from 'class-validator';

export class UpdateRoleDto {
  @ApiProperty({
    example: 'MANAGER',
  })
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  @IsNotEmpty()
  @IsUppercase()
  name!: string;
  @ApiProperty({
    example: 'Manager System',
  })
  @IsOptional()
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  description!: string;
}
