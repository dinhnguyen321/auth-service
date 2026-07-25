import {
  Entity,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { Permission } from './permission.entity';

@Entity('role_permissions')
export class RolePermission {
  @PrimaryColumn()
  role_id!: string;

  @PrimaryColumn()
  permission_id!: string;

  @Column()
  assignedBy!: string;

  @ManyToOne(() => Role, (role) => role.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'role_id' })
  role!: Role;

  @ManyToOne(() => Permission, (permission) => permission.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'permission_id' })
  permission!: Permission;

  @CreateDateColumn({ type: 'timestamp' })
  assignedAt!: Date;
}
