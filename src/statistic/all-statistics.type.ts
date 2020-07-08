import { ObjectType, Field, Float } from '@nestjs/graphql'

@ObjectType('Statistics')
export class TotalStatisticType {
  @Field(type => Float)
  works_total: number

  @Field(type => Float)
  ads_total: number
}
