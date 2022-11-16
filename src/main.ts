import { UseInterceptors, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from "morgan";
import * as dotenv from 'dotenv';
import { DurationInterceptor } from './interceptors/duration.interceptor';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);  
  const corsOptions = {
    origin: ['http://localhost:4200']
  }
  app.enableCors(corsOptions);
  app.use(morgan('dev'));
  app.use(
    (req: Request, res: Response, next) => {
      console.log('Middleware from app.use');
      next();
    }
  )

  app.useGlobalPipes(new ValidationPipe( {
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  })); 

  app.useGlobalInterceptors(new DurationInterceptor());

  const config = new DocumentBuilder()
    .setTitle('KEI API')
    .setDescription('This is API for the KORV Estatement Inventory Apllication that provides more functionnalities.')
    .setVersion('1.0')
    .addTag('#kei-api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('APP_PORT'));
}

bootstrap();
clearImmediate