import { ObjectType, Field, ID } from '@nestjs/graphql'
import { PartnerType } from 'src/partner/partner.type'

@ObjectType('Sector')
export class SectorType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field(type => [PartnerType])
  partners: string[]

  @Field()
  created_at: Date

  @Field()
  updated_at: Date
}
