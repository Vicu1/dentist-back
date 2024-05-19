import { TypeOrmModule } from '@nestjs/typeorm';
import ConfigEnv from '@/config/config.env';

export default TypeOrmModule.forRoot({
  type: 'postgres',
  host: ConfigEnv.DB_HOST,
  port: Number(ConfigEnv.DB_PORT),
  username: ConfigEnv.DB_USER,
  password: ConfigEnv.DB_PASSWORD,
  database: ConfigEnv.DB_NAME,
  logging: false,
  autoLoadEntities: true,
  synchronize: Number(ConfigEnv.APP_DEV_MODE) === 1,
  cache: true,
});
