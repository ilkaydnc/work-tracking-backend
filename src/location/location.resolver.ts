import { Resolver, Query } from '@nestjs/graphql';
import { LocationType } from './location.type';

@Resolver(of => LocationType)
export class LocationResolver {
  @Query(returns => LocationType)
  location() {
    return {
      id: 1,
      name: 'asd',
    };
  }
}
