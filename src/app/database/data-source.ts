import { DataSource } from 'typeorm';
import * as dotenv from "dotenv";
import { UserEntity } from '../user/user.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: [
    UserEntity,
  ],
  migrations: ['src/app/database/migrations/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
})