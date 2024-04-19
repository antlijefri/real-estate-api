import { IsNotEmpty } from 'class-validator';

export class CreateUserRequest {
  @IsNotEmpty()
  firstName: string;

  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  isActive: number;

  @IsNotEmpty()
  mobile: number;
}
