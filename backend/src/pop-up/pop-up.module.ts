import { Module } from '@nestjs/common';
import { PopUpService } from './pop-up.service';
import { PopUpController } from './pop-up.controller';

@Module({
  controllers: [PopUpController],
  providers: [PopUpService],
})
export class PopUpModule {}
