import { Module } from '@nestjs/common';
import { PopUpService } from './pop-up.service';
import { PopUpController } from './pop-up.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PopUp } from './entities/pop-up.entity';
import { ServicesModule } from 'src/services/services.module';

@Module({
  imports: [TypeOrmModule.forFeature([PopUp]), ServicesModule],
  controllers: [PopUpController],
  providers: [PopUpService],
})
export class PopUpModule {}
