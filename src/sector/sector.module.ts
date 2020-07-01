import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { SectorResolver } from './sector.resolver'
import { SectorService } from './sector.service'
import { Sector } from './sector.entity'
import { AuthModule } from 'src/auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([Sector]), AuthModule],
  providers: [SectorResolver, SectorService],
  exports: [SectorService],
})
export class SectorModule {}
