import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import AppModules from '@/app/modules';
import TypeOrmModuleDB from '@/database/config/app.config';
import middlewares from '@/app/middlewares';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModuleDB, ...AppModules, JwtModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    middlewares.forEach((middleware) => {
      consumer.apply(middleware.guard).forRoutes(middleware.routes);
    });

    return consumer;
  }
}
