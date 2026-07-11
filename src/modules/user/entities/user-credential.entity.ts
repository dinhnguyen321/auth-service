import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_credentials')
export class UserCredential {
  @PrimaryColumn({
    type: 'uuid',
  })
  user_id!: string;

  @Column({
    length: 255,
    unique: true,
  })
  passwordHash!: string;

  @CreateDateColumn()
  passwordChangedAt!: Date;

  @CreateDateColumn()
  lastLoginAt!: Date;

  @Column({
    type: 'int',
    default: 0,
  })
  failedLoginAttempts!: number;

  @CreateDateColumn()
  lockedUntil!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User) // Ý nghĩa bảng này sẽ chứa khóa ngoại
  @JoinColumn({
    name: `user_id`,
  })
  user!: User;
}
