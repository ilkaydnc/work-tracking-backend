import { ObjectType, Field, ID } from '@nestjs/graphql'
import { SectorType } from 'src/sector/sector.type'
import { LocationType } from 'src/location/location.type'

@ObjectType('Partner')
export class PartnerType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  phone: string

  @Field(type => LocationType)
  location: string

  @Field(type => [SectorType])
  sectors: string[]

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
