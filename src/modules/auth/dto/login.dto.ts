import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class loginDto {
  @ApiProperty({
    example: 'daniel@gmail.com',
    description: 'Email người dùng',
  })
  @IsEmail()
  email!: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'Nhập mật khẩu',
  })
  password!: string;
}
