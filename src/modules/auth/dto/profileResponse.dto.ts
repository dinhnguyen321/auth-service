import { IsEmail, IsPhoneNumber } from 'class-validator';

export class ProfileResponseDTO {
  id!: string;

  @IsEmail()
  email!: string;
  fullName!: string;

  @IsPhoneNumber('VN')
  phone!: string;
  avatarUrl!: string;
  status!: string;
  roles!: {
    id: string;
    name: string;
  }[];
}
