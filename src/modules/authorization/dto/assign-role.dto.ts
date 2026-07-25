import { ApiProperty } from '@nestjs/swagger';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { IsArray, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class AssignRolesDto {
  @ApiProperty({
    example: ['ADMIN', 'USER'],
  })
  @IsArray({ message: 'RoleIds phải là 1 mảng' })
  @IsNotEmpty({ message: 'RoleIds không được để trống' })
  @IsString({
    each: true,
    message: 'Mõi phần tử trong mảng phải là một chuỗi ký tự',
  })
  // @IsUUID('4')
  name!: string[];
}
