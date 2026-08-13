import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreatePermissionDto {
  @ApiProperty({
    example: 'user',
  })
  @IsString()
  // @IsNotEmpty()
  module!: string;

  @ApiProperty({
    example: 'view',
  })
  @IsString()
  // @IsNotEmpty()
  action!: string;

  @ApiProperty({
    example: 'View User',
  })
  @IsString()
  @Column({ nullable: true })
  description!: string;
}
