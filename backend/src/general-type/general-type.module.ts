import { Module } from '@nestjs/common';
import { GeneralTypeService } from './general-type.service';
import { GeneralTypeController } from './general-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GeneralType } from './entities/general-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GeneralType])],
  controllers: [GeneralTypeController],
  providers: [GeneralTypeService],
})
export class GeneralTypeModule {}
