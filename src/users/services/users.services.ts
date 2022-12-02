import { Injectable, Inject, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import { SignupUserDTO } from "../dto/user.dto";
import { User } from "../user.entity";

@Injectable()
export class UserServices{
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  findOne(email: string): Promise<User> {
    return this.userRepository.findOneBy({ email : email });
  }
  async findOnebyid(id: string): Promise<User> {
    const user = await this.userRepository.findOneBy({ id : id });
    if (!user){
      throw new NotFoundException();
    }
    return user;
  }
  
  findall(){
    return this.userRepository.find();
  }

  createuser(Userbody:SignupUserDTO){
    return this.userRepository.save(this.userRepository.create(Userbody))
  }

}
