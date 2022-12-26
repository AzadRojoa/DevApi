import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { throws } from 'assert';
import { Repository } from 'typeorm';
import { PasswordLessUser, User } from '../../users/user.entity';
import { EventsDTO } from '../dto/events.dto';
import { Events, eventStatus } from '../event.entity';

@Injectable()
export class EventsServices {
  constructor(
    @InjectRepository(Events)
    private eventsRepository: Repository<Events>,
  ) {}

  async createEvent(user: PasswordLessUser, Eventbody: EventsDTO) {
    const resultdate = this.checkDate(user.id);
    if (!resultdate) {
      throw new UnauthorizedException();
    }
    const event = new Events();
    event.date = Eventbody.date;
    event.eventDescription = Eventbody.eventDescription;
    event.eventType = Eventbody.eventType;
    event.userId = user.id;
    return this.eventsRepository.save(event);
  }

  async checkDate(userId: string) {
    const allEventById = await this.eventsRepository.findBy({ userId: userId });
    for (let i = 0; i < allEventById.length; i++) {}
    if (true) {
      return true;
    }
  }

  async validateEvent(id: string) {
    if (this.findOneby(id)) {
      return this.eventsRepository.update(
        { id },
        { eventStatus: eventStatus.ACCEPTED },
      );
    }
  }
  async declineEvent(id: string) {
    if (this.findOneby(id)) {
      return this.eventsRepository.update(
        { id },
        { eventStatus: eventStatus.DECLINED },
      );
    }
  }
  async findOneby(id: string) {
    return await this.eventsRepository.findOneBy({ id: id });
  }
  async findOnebyid(id: string, user: PasswordLessUser) {
    return this.eventsRepository.findOneBy({ id: id });
  }

  findall(id: string) {
    return this.eventsRepository.find();
  }
}
