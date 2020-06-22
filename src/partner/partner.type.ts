import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SectorType } from 'src/sector/sector.type';

@ObjectType('Partner')
export class PartnerType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  locationId: string;

  @Field(type => [SectorType])
  sectors: string[];
}
