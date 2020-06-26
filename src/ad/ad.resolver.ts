import { Resolver, Query, Mutation, ResolveField, Parent, Args } from '@nestjs/graphql'
import { AdService } from './ad.service'
import { LocationService } from 'src/location/location.service'
import { SectorService } from 'src/sector/sector.service'
import { AdType } from './ad.type'
import { Ad } from './ad.entity'
import { CreateAdInput } from './create-ad.input'
import { UpdateAdInput } from './update-ad.input'
import { Sector } from 'src/sector/sector.entity'
import { Location } from 'src/location/location.entity'

@Resolver(of => AdType)
export class AdResolver {
  constructor(
    private adService: AdService,
    private locationService: LocationService,
    private sectorService: SectorService
  ) {}

  @Query(returns => [AdType])
  ads(): Promise<Ad[]> {
    return this.adService.getAds()
  }

  @Mutation(returns => AdType)
  createAd(@Args('createAdInput') createAdInput: CreateAdInput): Promise<Ad> {
    return this.adService.createAd(createAdInput)
  }
  @Mutation(returns => AdType)
  updateAd(@Args('updateAdInput') updateAdInput: UpdateAdInput): Promise<Ad> {
    return this.adService.updateAd(updateAdInput)
  }

  @Mutation(returns => AdType)
  deleteAd(@Args('id') id: string): Promise<Ad> {
    return this.adService.deleteAd(id)
  }

  @ResolveField()
  location(@Parent() ad: Ad): Promise<Location> {
    return this.locationService.getLocationByID(ad.locationId)
  }

  @ResolveField()
  sector(@Parent() ad: Ad): Promise<Sector> {
    return this.sectorService.getSectorByID(ad.sectorId)
  }
}
