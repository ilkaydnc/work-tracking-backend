import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType('Location')
export class LocationType {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;
}
