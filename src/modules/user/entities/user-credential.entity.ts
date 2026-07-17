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

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  passwordChangedAt!: Date | null;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lastLoginAt!: Date | null;

  @Column({
    type: 'int',
    default: 0,
  })
  failedLoginAttempts!: number;

  @Column({
    type: 'timestamptz',
    nullable: true,
  })
  lockedUntil!: Date | null;

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
