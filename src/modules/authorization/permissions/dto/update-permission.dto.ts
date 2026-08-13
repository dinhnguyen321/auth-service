import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Column } from 'typeorm';

export class UpdatePermissionDto {
  @ApiProperty({
    example: 'View User',
  })
  @Column({ nullable: true })
  @IsString()
  description?: string;
}
