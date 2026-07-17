import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCredential } from './user-credential.entity';
import { UserProfiles } from './user-profile.entity';
import { UserRole } from '../../authorization/entities/user-role.entity';

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  BLOCKED = 'BLOCKED',
}
@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({
    unique: true,
    length: 100,
  })
  email!: string;

  @Column({
    length: 100,
  })
  fullName!: string;

  @Column({
    length: 20,
  })
  phone!: string;

  @Column({
    length: 255,
  })
  avatarUrl!: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status!: UserStatus;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  emailVerifiedAt!: Date;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  phoneVerifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => UserCredential, (credential) => credential.user_id)
  credential!: UserCredential;

  @OneToOne(() => UserProfiles, (profile) => profile.user)
  profile!: UserProfiles;

  @OneToMany(() => UserRole, (userRole) => userRole.user)
  userRoles!: UserRole[];
}
