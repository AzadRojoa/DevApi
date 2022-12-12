import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { Eventscontroller } from './controllers/events.controller';
import { Events } from './event.entity';
import { EventsServices } from './services/events.services';





@Module({
  imports: [TypeOrmModule.forFeature([Events]),
  forwardRef(()=> AuthModule)],
  providers: [EventsServices],
  controllers: [Eventscontroller],
  exports:[EventsServices]
})
export class EventsModule {}
