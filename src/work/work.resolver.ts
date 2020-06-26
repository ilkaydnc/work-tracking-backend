import {
  Resolver,
  Query,
  Args,
  Mutation,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { WorkType } from './work.type';
import { WorkService } from './work.service';
import { PartnerService } from 'src/partner/partner.service';
import { LocationService } from 'src/location/location.service';
import { SectorService } from 'src/sector/sector.service';
import { Work } from './work.entity';
import { FilterWorksInput } from './filter-works.input';
import { CreateWorkInput } from './create-work.input';
import { Partner } from 'src/partner/partner.entity';
import { Location } from 'src/location/location.entity';
import { Sector } from 'src/sector/sector.entity';

@Resolver(of => WorkType)
export class WorkResolver {
  constructor(
    private workService: WorkService,
    private partnerService: PartnerService,
    private locationService: LocationService,
    private sectorService: SectorService,
  ) {}

  @Query(returns => [WorkType])
  works(
    @Args('filterWorksInput') filterWorksInput: FilterWorksInput,
  ): Promise<Work[]> {
    return this.workService.getWorks(filterWorksInput);
  }

  @Mutation(returns => WorkType)
  createWork(
    @Args('createWorkInput') createWorkInput: CreateWorkInput,
  ): Promise<Work> {
    return this.workService.createWork(createWorkInput);
  }

  @ResolveField()
  async partner(@Parent() work: Work): Promise<Partner> {
    return this.partnerService.getPartnerByID(work.partnerId);
  }

  @ResolveField()
  async location(@Parent() work: Work): Promise<Location> {
    const partner = await this.partnerService.getPartnerByID(work.partnerId)
  }

  @ResolveField()
  async sector(@Parent() work: Work): Promise<Sector> {
    return this.sectorService.getSectorByID(work.sectorId);
  }
}
