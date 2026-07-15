import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty({
    example: 'daniel@gmail.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Mật Khẩu',
  })
  password!: string;

  @ApiProperty({
    example: 'Daniel',
    description: 'Họ và tên',
  })
  fullName!: string;

  @ApiProperty({
    example: '0123456789',
    description: 'Số điện thoại',
  })
  @IsPhoneNumber('VN')
  phone!: string;

  @ApiProperty({
    example: 'https://cdn.example.com/avatar.png',
    description: 'Ảnh đại diện',
    required: false,
  })
  avatarUrl?: string;

  @ApiProperty({
    example: 'ACTIVE',
    description: 'Status',
  })
  status!: string;
}
