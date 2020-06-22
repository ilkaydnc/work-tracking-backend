import { Module } from '@nestjs/common';
import { PartnerService } from './partner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { PartnerResolver } from './partner.resolver';
import { SectorModule } from 'src/sector/sector.module';

@Module({
  imports: [TypeOrmModule.forFeature([Partner]), SectorModule],
  providers: [PartnerResolver, PartnerService],
})
export class PartnerModule {}
