import { DataSource } from 'typeorm';
import ConfigEnv from '@/config/config.env';

export default new DataSource({
  type: 'postgres',
  host: ConfigEnv.DB_HOST,
  port: Number(ConfigEnv.DB_PORT),
  username: ConfigEnv.DB_USER,
  password: ConfigEnv.DB_PASSWORD,
  database: ConfigEnv.DB_NAME,
  entities: ['build/dist/app/modules/**/*.entity.js'],
  migrations: ['build/dist/database/migrations/*.js'],
  synchronize: true,
  logging: true,
});
