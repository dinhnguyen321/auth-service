import {
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserCredential } from './user-credential.entity';

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
    length: 255,
  })
  status!: string;

  @CreateDateColumn()
  emailVerifiedAt!: Date;

  @CreateDateColumn()
  phoneVerifiedAt!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => UserCredential, (credential) => credential.user_id)
  credential!: UserCredential;
}
