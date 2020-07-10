import { Resolver, Query, Args } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { FilterStatisticInput } from './filter-statistics.input'
import { StatisticService } from './statistic.service'
import { StatisticType } from './statistics.type'

@Resolver(of => StatisticType)
@UseGuards(GqlAuthGuard)
export class StatisticResolver {
  constructor(private statisticService: StatisticService) {}

  @Query(returns => StatisticType)
  async statistics(): Promise<StatisticType> {
    return this.statisticService.getAllStatistics()
  }

  @Query(returns => StatisticType)
  async statisticsWithFilter(
    @Args('filterStatistics') filterStatistics: FilterStatisticInput
  ): Promise<StatisticType> {
    return this.statisticService.getStatisticsWithFilter(filterStatistics)
  }
}
