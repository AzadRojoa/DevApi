import { IsNotEmpty, MinLength } from 'class-validator';
import { eventType } from '../event.entity';

export class EventsDTO {
  @IsNotEmpty()
  date!: Date;

  @IsNotEmpty()
  eventDescription?: string;

  @IsNotEmpty()
  eventType!: eventType;
}
export class EventsValidateDTO {
  @IsNotEmpty()
  id!: string;
}
