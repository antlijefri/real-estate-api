import { IsNotEmpty } from 'class-validator';

export class CreatePropertyRequest {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  location: string;

  @IsNotEmpty()
  price: number;

  isActive: number;
}
