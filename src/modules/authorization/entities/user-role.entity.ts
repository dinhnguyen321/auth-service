import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { User } from '../../user/entities/user.entity';

@Entity('user_roles')
export class UserRole {
  @PrimaryColumn({
    name: 'user_id',
  })
  userId!: string;

  @PrimaryColumn({
    name: 'role_id',
  })
  roleId!: string;

  @CreateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  assignedAt!: Date;

  @Column({
    name: 'assigned_by',
  })
  assignedBy!: string;

  @Column({
    name: 'revoked_by',
    nullable: true,
  })
  revokedBy!: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  isActive!: boolean;

  @CreateDateColumn()
  revokedAt!: Date;

  @ManyToOne(() => User, (user) => user.userRoles)
  @JoinColumn({
    name: 'user_id',
  })
  user!: User;

  @ManyToOne(() => Role, (role) => role.userRoles)
  @JoinColumn({
    name: 'role_id',
  })
  role!: Role;
}
