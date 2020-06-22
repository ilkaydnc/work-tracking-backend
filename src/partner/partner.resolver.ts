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
import { CreatePartnerInput } from './partner.input';
import { SectorService } from '../sector/sector.service';
import { Sector } from 'src/sector/sector.entity';

@Resolver(of => PartnerType)
export class PartnerResolver {
  constructor(
    private partnerService: PartnerService,
    private sectorService: SectorService,
  ) {}

  @Query(returns => [PartnerType])
  partner(): Promise<Partner[]> {
    return this.partnerService.getPartners();
  }

  @Mutation(returns => PartnerType)
  createPartner(
    @Args('createPartnerInput') createPartnerInput: CreatePartnerInput,
  ): Promise<Partner> {
    return this.partnerService.createPartner(createPartnerInput);
  }

  @ResolveField()
  async sectors(@Parent() partner: Partner): Promise<Sector[]> {
    return this.sectorService.getManySectors(partner.sectorIds);
  }
}
