import { ObjectType, Field, ID, Int } from '@nestjs/graphql'
import { LocationType } from 'src/location/location.type'
import { SectorType } from 'src/sector/sector.type'

@ObjectType('Ad')
export class AdType {
  @Field(type => ID)
  id: string

  @Field(type => LocationType)
  location: string

  @Field(type => SectorType)
  sector: string

  @Field(type => Int)
  amount: number

  @Field()
  date: string
}
