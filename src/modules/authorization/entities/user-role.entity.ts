// import { User } from 'src/modules/user/entities/user.entity';
// import {
//   Column,
//   CreateDateColumn,
//   Entity,
//   ManyToOne,
//   PrimaryColumn,
// } from 'typeorm';

// @Entity('user_roles')
// export class UserRole {
//   @PrimaryColumn({
//     name: 'user_id',
//   })
//   user_id!: string;

//   @PrimaryColumn({
//     name: 'role_id',
//   })
//   role_id!: string;

//   @CreateDateColumn()
//   assignedAt!: Date;

//   @Column({
//     length: 100,
//   })
//   assignedBy!: string;

//   @Column({
//     length: 100,
//   })
//   revokedBy!: string;

//   @Column({
//     type: 'boolean',
//   })
//   isActive!: boolean;

//   @CreateDateColumn()
//   revokedAt!: Date;

//   // @ManyToOne(() => User, (user) => user.id)
// }
