import { ObjectType, Field, Float } from '@nestjs/graphql'

@ObjectType('StatisticsWithFilter')
export class FilteredStatisticType {
  @Field(type => Float)
  filtered_works_total: number

  @Field(type => Float)
  filtered_ads_total: number
}
