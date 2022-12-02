import { IsNotEmpty, MinLength } from "class-validator";

export class ProjectDTO {
  
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  referringEmployeeId!: string;
}
