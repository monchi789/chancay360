import { Test, TestingModule } from '@nestjs/testing';
import { PopUpController } from './pop-up.controller';
import { PopUpService } from './pop-up.service';

describe('PopUpController', () => {
  let controller: PopUpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PopUpController],
      providers: [PopUpService],
    }).compile();

    controller = module.get<PopUpController>(PopUpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
