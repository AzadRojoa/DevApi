import { Controller, Get, Query, Post,Request, Body, Put, Param, Delete, Inject, ValidationPipe, UsePipes, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { UserServices } from '../services/users.services';
import {LoginUserDTO, SignupUserDTO} from '../dto/user.dto'
import { User } from '../user.entity';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AuthService } from '../../auth/services/auth.service';

@Controller('users')
export class UsersController {
  constructor(private userservices:UserServices, private authService: AuthService){
  }
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @UsePipes(ValidationPipe)
  checklog(@Body() Userbody: LoginUserDTO, @Request() req): Promise<{ access_token: string; }>{
    return this.authService.login(req.user);
  }

  @Post('auth/sign-up')
  @UsePipes(ValidationPipe)
  create(@Body() Userbody: SignupUserDTO): Promise<User> {
    return this.userservices.createuser(Userbody);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', new ParseUUIDPipe()) id:string ) {
    return this.userservices.findOnebyid(id)
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.userservices.findall()
  }
}
