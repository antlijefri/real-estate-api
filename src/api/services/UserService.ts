import { Service } from 'typedi';
import { AppDataSource } from '../../config/database/typeormConfig';
import { User } from '../models/User';
import {
  DeleteResult,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
} from 'typeorm';

@Service()
export class UserService {
  private userRepository = AppDataSource.getRepository(User);

  public async find(condition?: FindManyOptions<User>): Promise<User[]> {
    return this.userRepository.find(condition ?? {});
  }

  public async findOne(condition: FindOneOptions<User>): Promise<User | null> {
    return this.userRepository.findOne(condition);
  }

  public async save(entity: User): Promise<User> {
    return this.userRepository.save(entity);
  }

  public async delete(entity: FindOptionsWhere<User>): Promise<DeleteResult> {
    return this.userRepository.delete(entity);
  }
}
