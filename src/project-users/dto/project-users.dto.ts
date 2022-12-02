import { IsNotEmpty, MinLength } from "class-validator";

export class ProjectUserDTO {
  
  @IsNotEmpty()
  startDate!: Date;
  
  @IsNotEmpty()
  endDate!: Date;

  @IsNotEmpty()
  userId!: string;

  @IsNotEmpty()
  projectId!: string;

}
