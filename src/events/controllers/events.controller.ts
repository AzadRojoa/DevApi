import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { EventsDTO, EventsValidateDTO } from '../dto/events.dto';
import { EventsServices } from '../services/events.services';

@Controller('events')
export class Eventscontroller {
  constructor(private eventsservices: EventsServices) {}

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post(':id/validate')
  validateEvents(@Param('id', new ParseUUIDPipe()) id: EventsValidateDTO) {
    return this.eventsservices.validateEvent(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post(':id/decline')
  declineEvents(@Param('id', new ParseUUIDPipe()) id: EventsValidateDTO) {
    return this.eventsservices.declineEvent(id.id);
  }

  @UseGuards(JwtAuthGuard)
  @UsePipes(ValidationPipe)
  @Post()
  createEvents(@Body() Eventbody: EventsDTO, @Request() req) {
    return this.eventsservices.createEvent(req.user, Eventbody);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getProject(@Param('id', new ParseUUIDPipe()) id: string, @Request() req) {
    return this.eventsservices.findOnebyid(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllProject() {
    return this.eventsservices.findall();
  }
}
