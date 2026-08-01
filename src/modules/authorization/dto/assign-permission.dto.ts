import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AssignPermissionsDto {
  @ApiProperty({
    example: '1',
  })
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  roleId!: number;

  @ApiProperty({
    example: ['1', '2', '3', '4'],
  })
  @IsArray({ message: 'PermissionIds phải là 1 mảng' })
  @IsNotEmpty({ message: 'PermissionIds không được để trống' })
  permissionIds!: number[];
}
