import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'admin@gmail.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email!: string;

  @IsString()
  @ApiProperty({
    example: '123456',
    description: 'Mật Khẩu',
  })
  @IsNotEmpty()
  password!: string;

  @IsString()
  @ApiProperty({
    example: 'Daniel',
    description: 'Họ và tên',
  })
  fullName!: string;

  @ApiProperty({
    example: '0823456782',
    description: 'Số điện thoại',
  })
  @IsPhoneNumber('VN')
  phone!: string;

  @IsOptional()
  @ApiProperty({
    example: 'https://cdn.example.com/avatar.png',
    description: 'Ảnh đại diện',
    required: false,
  })
  avatarUrl?: string;

  @IsString()
  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status',
  })
  status!: string;
}
