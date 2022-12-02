import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

enum eventStatus {
  PENDING = "Pending",
  ACCEPTED = "Accepted",
  DECLINED = "Declined",
}
enum eventType {
  REOTEWORK = "RemoteWork",
  PAIDLEAVE = "PaidLeave",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  date!: Date;

  @Column({
    type: "enum",
    enum: eventStatus,
    default: [eventStatus.PENDING],
  })
  eventStatus!: eventStatus[]

  @Column({
    type: "enum",
    enum: eventType,
  })
  eventType!: eventType[]
  
  @Column()
  eventDescription?: string;

  @PrimaryGeneratedColumn("uuid")
  userId!: string;
}
