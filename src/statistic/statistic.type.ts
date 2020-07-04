import { ObjectType, Field, Int, Float } from '@nestjs/graphql'

@ObjectType('Statistic')
export class StatisticType {
  @Field(type => Float)
  works_total: number

  @Field(type => Float)
  ads_total: number
}
