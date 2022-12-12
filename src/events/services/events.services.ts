import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import { ProjectsServices } from "../../projects/services/projects.services";
import { UserServices } from "../../users/services/users.services";
import { PasswordLessUser,} from "../../users/user.entity";
import { EventsDTO } from "../dto/events.dto";
import { Events } from "../event.entity";


@Injectable()
export class EventsServices{
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
  ) {}

  async createEvent(user: PasswordLessUser, Eventbody: EventsDTO) {
    const Event = new Events()
    Event.date = Eventbody.date
    Event.eventDescription = Eventbody.eventDescription
    Event.eventType = Eventbody.eventType
    Event.userId = user.id
    return this.eventsRepository.save(this.eventsRepository.create(Event))
  }

  findOnebyProjectIdAndUserid(id: string, userid: string ){
    return null
  }

  findOnebyid(id : string, user: PasswordLessUser){
    return null
  }

  findall(user: PasswordLessUser){
    return null
  }

}
