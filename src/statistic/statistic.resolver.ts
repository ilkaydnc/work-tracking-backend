import { Resolver, Query, Args } from '@nestjs/graphql'
import { StatisticType } from './statistic.type'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'
import { FilterStatisticInput } from './filter-statistics.input'
import { StatisticService } from './statistic.service'

@Resolver(of => StatisticType)
@UseGuards(GqlAuthGuard)
export class StatisticResolver {
  constructor(private statisticService: StatisticService) {}

  @Query(returns => [StatisticType])
  async statistics(
    @Args('filterStatistics') filterStatistics: FilterStatisticInput
  ): Promise<StatisticType[]> {
    return this.statisticService.getStatisticsWithFilter(filterStatistics)
  }
}
