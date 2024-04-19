import { Service } from 'typedi';
import { AppDataSource } from '../../config/database/typeormConfig';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';
import { Property } from '../models/Property';

@Service()
export class PropertyService {
  private propertyRepository = AppDataSource.getRepository(Property);

  public async find(
    condition?: FindManyOptions<Property>
  ): Promise<Property[]> {
    return this.propertyRepository.find(condition ?? {});
  }

  public async findOne(
    condition: FindOneOptions<Property>
  ): Promise<Property | null> {
    return this.propertyRepository.findOne(condition);
  }

  public async save(entity: Property): Promise<Property> {
    return this.propertyRepository.save(entity);
  }

  public async delete(
    entity: FindOptionsWhere<Property>
  ): Promise<DeleteResult> {
    return this.propertyRepository.delete(entity);
  }
}
