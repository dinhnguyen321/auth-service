import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'daniel@gmail.com',
    description: 'Email của người dùng',
  })
  @IsEmail()
  email!: string;

  @ApiProperty({
    example: 'Daniel',
    description: 'Họ và tên',
  })
  @IsString()
  fullName!: string;

  @ApiProperty({
    example: '0987654321',
    description: 'Số điện thoại',
  })
  @IsPhoneNumber('VN')
  phone!: string;

  @ApiProperty({
    example: 'https://cdn.example.com/avatar.png',
    description: 'Ảnh đại diện',
    required: false,
  })
  @IsString()
  avatarUrl?: string;
}
