import { DataSource } from 'typeorm';
import { dbconfig } from '../utils/env';
import { User } from '../../api/models/User';
import { Property } from '../../api/models/Property';
import { PropertyImage } from '../../api/models/PropertyImage';

const AppDataSource = new DataSource({
  type: 'mysql',
  host: dbconfig.host,
  port: dbconfig.port,
  username: dbconfig.username,
  password: dbconfig.password,
  database: dbconfig.database,
  entities: [User, Property, PropertyImage],
  synchronize: dbconfig.synchronize,
  logging: dbconfig.logging,
});

export { AppDataSource };
