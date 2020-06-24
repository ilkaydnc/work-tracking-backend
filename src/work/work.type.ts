import { ObjectType, Field, ID } from '@nestjs/graphql';
import { PartnerType } from 'src/partner/partner.type';
import { LocationType } from 'src/location/location.type';
import { SectorType } from 'src/sector/sector.type';

@ObjectType('Work')
export class WorkType {
  @Field(type => ID)
  id: string;

  @Field(type => PartnerType)
  partner: string;

  @Field(type => LocationType)
  location: string;

  @Field(type => SectorType)
  sector: string;

  @Field()
  amount: number;

  @Field()
  date: string;
}
