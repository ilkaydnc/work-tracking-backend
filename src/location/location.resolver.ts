import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { LocationType } from './location.type'
import { LocationService } from './location.service'
import { Location } from './location.entity'
import { CreateLocationInput } from './location.input'
import { UseGuards } from '@nestjs/common'
import { GqlAuthGuard } from 'src/auth/gql-auth.guard'

@Resolver(of => LocationType)
@UseGuards(GqlAuthGuard)
export class LocationResolver {
  constructor(private locationService: LocationService) {}

  @Query(returns => [LocationType])
  locations(): Promise<Location[]> {
    return this.locationService.getLocations()
  }

  @Mutation(returns => LocationType)
  createLocation(
    @Args('createLocationInput') createLocationInput: CreateLocationInput
  ): Promise<Location> {
    return this.locationService.createLocation(createLocationInput)
  }

  @Mutation(returns => LocationType)
  deleteLocation(@Args('id') id: string): Promise<Location> {
    return this.locationService.deleteLocation(id)
  }
}
