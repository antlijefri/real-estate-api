import { DataSource } from 'typeorm';
import { dbconfig } from '../utils/env';
import { User } from '../../api/models/User';
import { Property } from '../../api/models/Property';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbconfig.host,
  port: dbconfig.port,
  username: dbconfig.username,
  password: dbconfig.password,
  database: dbconfig.database,
  entities: [User, Property],
  synchronize: dbconfig.synchronize,
  logging: dbconfig.logging,
});

export { AppDataSource };
