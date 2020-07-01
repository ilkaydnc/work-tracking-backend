import { Module } from '@nestjs/common'
import { AdService } from './ad.service'
import { AdResolver } from './ad.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Ad } from './ad.entity'
import { LocationModule } from 'src/location/location.module'
import { SectorModule } from 'src/sector/sector.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Ad]), LocationModule, SectorModule, AuthModule],
  providers: [AdResolver, AdService],
})
export class AdModule {}
