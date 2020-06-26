import { ObjectType, Field, ID } from '@nestjs/graphql'
import { PartnerType } from 'src/partner/partner.type'

@ObjectType('Location')
export class LocationType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => [PartnerType])
  partners: string[]
}
