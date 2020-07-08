import { Resolver, Query, Args } from '@nestjs/graphql'
import { FilteredStatisticType } from './filtered-statistic.type'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { FilterStatisticInput } from './filter-statistics.input'
import { StatisticService } from './statistic.service'
import { TotalStatisticType } from './all-statistics.type'

@Resolver(of => FilteredStatisticType)
@UseGuards(GqlAuthGuard)
export class StatisticResolver {
  constructor(private statisticService: StatisticService) {}

  @Query(returns => TotalStatisticType)
  async statistics(): Promise<TotalStatisticType> {
    return this.statisticService.getAllStatistics()
  }

  @Query(returns => FilteredStatisticType)
  async statisticsWithFilter(
    @Args('filterStatistics') filterStatistics: FilterStatisticInput
  ): Promise<FilteredStatisticType> {
    return this.statisticService.getStatisticsWithFilter(filterStatistics)
  }
}
