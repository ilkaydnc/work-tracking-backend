import { Module } from '@nestjs/common'
import { WorkService } from './work.service'
import { WorkResolver } from './work.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Work } from './work.entity'
import { PartnerModule } from 'src/partner/partner.module'
import { LocationModule } from 'src/location/location.module'
import { SectorModule } from 'src/sector/sector.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([Work]),
    PartnerModule,
    LocationModule,
    SectorModule,
    AuthModule,
  ],
  providers: [WorkService, WorkResolver],
})
export class WorkModule {}
