import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../projects/project.entity';

@Entity()
export class ProjectUser {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  startDate!: Date;

  @Column()
  endDate!: Date;

  @Column('uuid')
  projectId!: string;

  @Column('uuid')
  userId!: string;

  @ManyToOne(() => Project, (project) => project.projectUsers)
  project: Project;
}
