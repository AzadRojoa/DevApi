
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type PasswordLessUser=Omit<User,"password">;

export enum UserRole {
  EMPLOYEE = "Employee",
  ADMIN = "Admin",
  PROJETCTMANAGER = "ProjectManager",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({unique: true})
  username!: string;

  @Column({unique: true})
  email!: string;

  @Column()
  password!: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  role!: UserRole
}
