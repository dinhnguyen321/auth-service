import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class AssignPermissionsDto {
  @ApiProperty({
    example: '874fe1ea-e8ab-4ac3-8eab-7115b5540c73',
  })
  @IsString({
    each: true,
    message: 'Phần tử phải là một chuỗi ký tự',
  })
  roleId!: string;

  @ApiProperty({
    example: [
      '035fc97d-ba8d-4b00-9952-7c88e92583da',
      '05d82fd6-867c-43fe-a346-773472dd4711',
      '3f64d686-9c9a-4a06-82d4-2b80e1502470',
      '743ff807-d4ad-4aa9-92bb-b6a702f2a1ee',
    ],
  })
  @IsArray({ message: 'PermissionIds phải là 1 mảng' })
  @IsNotEmpty({ message: 'PermissionIds không được để trống' })
  permissionIds!: string[];
}
