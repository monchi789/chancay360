import { Test, TestingModule } from '@nestjs/testing';
import { PopUpService } from './pop-up.service';

describe('PopUpService', () => {
  let service: PopUpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PopUpService],
    }).compile();

    service = module.get<PopUpService>(PopUpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
