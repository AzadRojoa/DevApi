import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProjectUser } from '../project-users/project-user.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  name!: string;
  
  @Column({type:'uuid'})
  referringEmployeeId!: string;
  
  // @OneToMany(() => ProjectUser, (projectUser) => projectUser.project)
  // projectUsers: ProjectUser[]
}
