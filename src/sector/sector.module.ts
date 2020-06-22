import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorResolver } from './sector.resolver';
import { SectorService } from './sector.service';
import { Sector } from './sector.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sector])],
  providers: [SectorResolver, SectorService],
})
export class SectorModule {}
