import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUppercase } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    example: 'ADMIN',
  })
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  @IsUppercase()
  name!: string;
  @ApiProperty({
    example: 'Normal User',
  })
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  description!: string;
}
