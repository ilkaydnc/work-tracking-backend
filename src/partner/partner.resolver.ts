import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { PartnerType } from './partner.type';
import { PartnerService } from './partner.service';
import { Partner } from './partner.entity';
import { CreatePartnerInput } from './create-partner.input';
import { SectorService } from '../sector/sector.service';
import { Sector } from 'src/sector/sector.entity';
import { LocationService } from 'src/location/location.service';
import { Location } from 'src/location/location.entity';
import { UpdatePartnerInput } from './update-partner.input';

@Resolver(of => PartnerType)
export class PartnerResolver {
  constructor(
    private partnerService: PartnerService,
    private sectorService: SectorService,
    private locationService: LocationService,
  ) {}

  @Query(returns => [PartnerType])
  partners(): Promise<Partner[]> {
    return this.partnerService.getPartners();
  }

  @Mutation(returns => PartnerType)
  createPartner(
    @Args('createPartnerInput') createPartnerInput: CreatePartnerInput,
  ): Promise<Partner> {
    return this.partnerService.createPartner(createPartnerInput);
  }

  @Mutation(returns => PartnerType)
  updatePartner(
    @Args('updatePartnerInput') updatePartnerInput: UpdatePartnerInput,
  ): Promise<Partner> {
    return this.partnerService.updatePartner(updatePartnerInput);
  }

  @Mutation(returns => PartnerType)
  deletePartner(@Args('id') id: string): Promise<Partner> {
    return this.partnerService.deletePartner(id);
  }

  @ResolveField()
  async sectors(@Parent() partner: Partner): Promise<Sector[]> {
    return this.sectorService.getManySectors(partner.sectorIds);
  }

  @ResolveField()
  async location(@Parent() partner: Partner): Promise<Location> {
    return this.locationService.getLocationByID(partner.locationId);
  }
}
