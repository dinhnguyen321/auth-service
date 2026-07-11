import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  PrimaryColumn,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_profile')
export class UserProfiles {
  @PrimaryColumn({
    name: 'user_id',
    type: 'uuid',
  })
  userId!: string;

  @Column()
  bio!: string;

  @Column()
  gender!: string;

  @Column({
    type: 'date',
  })
  birthDay!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => User, (user) => user.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user!: User;
}
