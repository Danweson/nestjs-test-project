import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { logger } from './middlewares/Logger.middlewares';
import { TodoModule } from './todo/todo.module';
import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CvModule } from './cv/cv.module';
import { CvEntity } from './cv/entities/cv.entity';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ProductsModule } from './resources/products/products.module';
import { ClientsModule } from './resources/clients/clients.module';
import { CompagniesModule } from './resources/compagnies/compagnies.module';
import { CountriesModule } from './resources/countries/countries.module';
import { ProjectsModule } from './resources/projects/projects.module';

@Module({
  imports: [
    TodoModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    // TypeOrmModule.forRoot({
    //   type: 'mysql',
    //   host: process.env.DB_HOST,
    //   port: parseInt(process.env.DB_PORT),
    //   username: process.env.DB_USERNAME,
    //   password: process.env.DB_PASSWORD,
    //   database: process.env.DB_NAME,
    //   entities: ["dist/**/*.entity{.ts,.js}"],
    //   synchronize: true,
    // }),

    // Configuration de la BD
    TypeOrmModule.forRoot(),
    CompagniesModule,
    CountriesModule,
    // ProjectsModule,
    // CvModule,
    // UserModule,
    // CategoriesModule,
    // ProductsModule,
    // ClientsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{

  configure(consumer: MiddlewareConsumer): any {
    // HelmetMiddleware.configure({});
    consumer.apply(FirstMiddleware, logger).forRoutes({
      path: "todo*",
      method: RequestMethod.GET
    },{
      path: "todo*",
      method: RequestMethod.DELETE
    })
    .apply(logger).forRoutes('')
    .apply(HelmetMiddleware).forRoutes('')
    ;
  } 
}
