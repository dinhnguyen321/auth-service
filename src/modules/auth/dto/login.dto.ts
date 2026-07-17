import { ApiProperty } from '@nestjs/swagger';

export class loginDto {
  @ApiProperty({
    example: 'daniel@gmail.com',
    description: 'Email người dùng',
  })
  email!: string;

  @ApiProperty({
    example: '123456',
    description: 'Nhập mật khẩu',
  })
  password!: string;
}
