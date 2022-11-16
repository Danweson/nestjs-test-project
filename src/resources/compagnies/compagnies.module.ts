import { Module } from '@nestjs/common';
import { CompagniesService } from './compagnies.service';
import { CompagniesController } from './compagnies.controller';

@Module({
  controllers: [CompagniesController],
  providers: [CompagniesService],
})
export class CompagniesModule {}
