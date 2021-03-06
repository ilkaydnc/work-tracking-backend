import { Module } from '@nestjs/common'
import { PartnerService } from './partner.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Partner } from './partner.entity'
import { PartnerResolver } from './partner.resolver'
import { SectorModule } from 'src/sector/sector.module'
import { LocationModule } from 'src/location/location.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Partner]), SectorModule, LocationModule, AuthModule],
  providers: [PartnerResolver, PartnerService],
  exports: [PartnerService],
})
export class PartnerModule {}
