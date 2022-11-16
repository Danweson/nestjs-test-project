import { Test, TestingModule } from '@nestjs/testing';
import { CompagniesService } from './compagnies.service';

describe('CompagniesService', () => {
  let service: CompagniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompagniesService],
    }).compile();

    service = module.get<CompagniesService>(CompagniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
