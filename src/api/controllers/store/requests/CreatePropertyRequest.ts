import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

export class PropertyImageRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  path: string;

  @IsNotEmpty()
  isDefault: number;
}

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

  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PropertyImageRequest)
  propertyImage: PropertyImageRequest[];
}
