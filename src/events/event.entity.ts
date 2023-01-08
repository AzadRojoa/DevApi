import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export enum eventStatus {
  PENDING = 'Pending',
  ACCEPTED = 'Accepted',
  DECLINED = 'Declined',
}
export enum eventType {
  REOTEWORK = 'RemoteWork',
  PAIDLEAVE = 'PaidLeave',
}

@Entity()
export class Events {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  date!: Date;

  @Column({
    type: 'enum',
    enum: eventStatus,
    default: eventStatus.PENDING,
  })
  eventStatus!: eventStatus;

  @Column({
    type: 'enum',
    enum: eventType,
  })
  eventType!: eventType;

  @Column()
  eventDescription?: string;

  @Column()
  userId!: string;
}
