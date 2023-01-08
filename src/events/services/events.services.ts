import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { use } from 'passport';
import { Repository, UpdateResult } from 'typeorm';
import { PasswordLessUser, User } from '../../users/user.entity';
import { EventsDTO, EventsValidateDTO } from '../dto/events.dto';
import { Events, eventStatus, eventType } from '../event.entity';
import * as weekOfYear from 'dayjs/plugin/weekOfYear';

@Injectable()
export class EventsServices {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async createEvent(
    user: PasswordLessUser,
    Eventbody: EventsDTO,
  ): Promise<Events> {
    const resultdate = await this.checkDate(user.id, Eventbody);
    if (resultdate) {
      throw new UnauthorizedException();
    }
    const event = new Events();
    event.date = new Date(Eventbody.date);
    event.eventDescription = Eventbody.eventDescription;
    event.eventType = Eventbody.eventType;
    event.userId = user.id;
    if (user.role === 'Employee') {
      if (Eventbody.eventType === 'PaidLeave') {
        event.eventStatus = eventStatus.PENDING;
      } else {
        event.eventStatus = eventStatus.ACCEPTED;
      }
    } else {
      event.eventStatus = eventStatus.ACCEPTED;
    }
    return this.eventsRepository.save(event);
  }

  async checkDate(
    userId: string,
    Eventbody: EventsDTO,
    nbRemoteWork = 0,
  ): Promise<boolean> {
    const allEventById = await this.eventsRepository.findBy({ userId: userId });
    const date: Date = new Date(Eventbody.date);
    const dayEvent = date.getDate();
    const dayEventUTC = date.getUTCDate();
    const monthEvent = date.getMonth();
    const yearEvent = date.getFullYear();
    var count = 0;
    if (allEventById !== undefined) {
      const day = date.getDate();
      const dayUTC = date.getUTCDate();
      const month = date.getMonth();
      const year = date.getFullYear();
      for (let i = 0; i < allEventById.length; i++) {
        if (
          dayEventUTC - dayUTC >= 0 &&
          dayEventUTC - dayUTC < 7 &&
          monthEvent === month &&
          yearEvent === year
        ) {
          if (dayEvent === day) {
            return true;
          }
          if (Eventbody.eventType === 'PaidLeave') {
            if (count >= 2) {
              return true;
            }
            count++;
            console.log(count);
          }
        }
        if (
          dayUTC - dayEventUTC >= 0 &&
          dayUTC - dayEventUTC < 7 &&
          monthEvent === month &&
          yearEvent === year
        ) {
          if (dayEvent === day) {
            return true;
          }
          if (Eventbody.eventType === 'PaidLeave') {
            if (count >= 2) {
              return true;
            }
            count++;
          }
        }
      }
      return false;
    } else {
      return false;
    }
  }

  async validateEvent(id: string): Promise<UpdateResult> {
    const isHere = await this.findOneby(id);
    if (isHere) {
      return this.eventsRepository.update(
        { id },
        { eventStatus: eventStatus.ACCEPTED },
      );
    }
  }

  async declineEvent(id: string): Promise<UpdateResult> {
    const isHere = await this.findOneby(id);
    if (isHere) {
      return this.eventsRepository.update(
        { id },
        { eventStatus: eventStatus.DECLINED },
      );
    }
  }

  async findOneby(id: string): Promise<Events> {
    return await this.eventsRepository.findOneBy({ id: id });
  }

  async findOnebyid(id: string, user: PasswordLessUser): Promise<Events> {
    return this.eventsRepository.findOneBy({ id: id });
  }

  findall(): Promise<Events[]> {
    return this.eventsRepository.find();
  }
}
