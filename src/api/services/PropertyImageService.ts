import { Service } from 'typedi';
import { AppDataSource } from '../../config/database/typeormConfig';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { PropertyImage } from '../models/PropertyImage';

@Service()
export class PropertyImageService {
  private propertyImageRepository = AppDataSource.getRepository(PropertyImage);

  public async find(
    condition?: FindManyOptions<PropertyImage>
  ): Promise<PropertyImage[]> {
    return this.propertyImageRepository.find(condition ?? {});
  }

  public async findOne(
    condition: FindOneOptions<PropertyImage>
  ): Promise<PropertyImage | null> {
    return this.propertyImageRepository.findOne(condition);
  }

  public async save(entity: PropertyImage): Promise<PropertyImage> {
    return this.propertyImageRepository.save(entity);
  }

  public async delete(
    entity: FindOptionsWhere<PropertyImage>
  ): Promise<DeleteResult> {
    return this.propertyImageRepository.delete(entity);
  }
}
