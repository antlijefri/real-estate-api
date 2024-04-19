import { Service } from 'typedi';
import { AppDataSource } from '../../config/database/typeormConfig';
import { PropertySchedule } from '../models/PropertySchedule';
import { FindManyOptions, FindOneOptions } from 'typeorm';

@Service()
export class PropertyScheduleService {
  private categoryRepository = AppDataSource.getRepository(PropertySchedule);

  public async find(
    condition?: FindManyOptions<PropertySchedule>
  ): Promise<PropertySchedule[]> {
    return this.categoryRepository.find(condition ?? {});
  }

  public async findOne(
    condition: FindOneOptions<PropertySchedule>
  ): Promise<PropertySchedule | null> {
    return this.categoryRepository.findOne(condition);
  }

  public async create(entity: PropertySchedule): Promise<PropertySchedule> {
    return this.categoryRepository.save(entity);
  }
}
