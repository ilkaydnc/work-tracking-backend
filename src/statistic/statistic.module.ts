import { Module } from '@nestjs/common'
import { StatisticService } from './statistic.service'
import { WorkModule } from 'src/work/work.module'
import { AdModule } from 'src/ad/ad.module'
import { AuthModule } from 'src/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Work } from 'src/work/work.entity'
import { Ad } from 'src/ad/ad.entity'
import { StatisticResolver } from './statistic.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([Work, Ad]), WorkModule, AdModule, AuthModule],
  providers: [StatisticService, StatisticResolver],
})
export class StatisticModule {}
