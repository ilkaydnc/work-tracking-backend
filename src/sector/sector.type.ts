import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Sector')
export class SectorType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
