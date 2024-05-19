import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AppModules from '@/app/modules';
import TypeOrmModuleDB from '@/database/config/app.config';

@Module({
  imports: [TypeOrmModuleDB, ...AppModules],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(AuthMiddleware).forRoutes('*');

    return consumer;
  }
}
