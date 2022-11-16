import { Test, TestingModule } from '@nestjs/testing';
import { CompagniesController } from './compagnies.controller';
import { CompagniesService } from './compagnies.service';

describe('CompagniesController', () => {
  let controller: CompagniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompagniesController],
      providers: [CompagniesService],
    }).compile();

    controller = module.get<CompagniesController>(CompagniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
