import { Resolver, Query, Args, Mutation, Parent, ResolveField } from '@nestjs/graphql'
import { WorkType } from './work.type'
import { WorkService } from './work.service'
import { PartnerService } from 'src/partner/partner.service'
import { LocationService } from 'src/location/location.service'
import { SectorService } from 'src/sector/sector.service'
import { Work } from './work.entity'
import { FilterWorksInput } from './filter-works.input'
import { CreateWorkInput } from './create-work.input'
import { Partner } from 'src/partner/partner.entity'
import { Location } from 'src/location/location.entity'
import { Sector } from 'src/sector/sector.entity'
import { BadRequestException } from '@nestjs/common'
import { UpdateWorkInput } from './update-work.input'

@Resolver(of => WorkType)
export class WorkResolver {
  constructor(
    private workService: WorkService,
    private partnerService: PartnerService,
    private locationService: LocationService,
    private sectorService: SectorService
  ) {}

  @Query(returns => [WorkType])
  async works(@Args('filterWorksInput') filterWorksInput?: FilterWorksInput): Promise<Work[]> {
    const { partnerId, locationId, sectorId, startDate, endDate } = filterWorksInput

    if (partnerId) await this.partnerService.getPartnerByID(partnerId)
    if (locationId) await this.locationService.getLocationByID(locationId)
    if (sectorId) await this.sectorService.getSectorByID(sectorId)

    return this.workService.getWorksWithFilter(filterWorksInput)
  }

  @Mutation(returns => WorkType)
  async createWork(@Args('createWorkInput') createWorkInput: CreateWorkInput): Promise<Work> {
    const { partnerId, sectorId } = createWorkInput
    const partner = await this.partnerService.getPartnerByID(partnerId)

    await this.sectorService.getSectorByID(sectorId)

    if (!partner.sectorIds.includes(sectorId))
      throw new BadRequestException(`${partner.name} has no sector with ID: ${sectorId}`)

    return this.workService.createWork({
      ...createWorkInput,
      locationId: partner.locationId,
    })
  }

  @Mutation(returns => WorkType)
  async updateWork(@Args('updateWorkInput') updateWorkInput: UpdateWorkInput): Promise<Work> {
    const { id, partnerId, sectorId } = updateWorkInput
    const currentWork = await this.workService.getWorkByID(id)
    const currentPartnerId = currentWork.partnerId
    const currentSectorId = currentWork.sectorId
    const partner = await this.partnerService.getPartnerByID(partnerId || currentPartnerId)

    if (sectorId) {
      await this.sectorService.getSectorByID(sectorId)
    }

    if (sectorId && !partner.sectorIds.includes(sectorId))
      throw new BadRequestException(`${partner.name} haven't this sector with ID: ${sectorId}`)

    if (!sectorId && !partner.sectorIds.includes(currentSectorId))
      throw new BadRequestException(
        `${partner.name} hasn't current sector in this work. Please update with sectorID.`
      )

    return this.workService.updateWork({
      ...updateWorkInput,
      locationId: partner.locationId,
    })
  }

  @Mutation(returns => WorkType)
  async deleteWork(@Args('id') id: string): Promise<Work> {
    return this.workService.deleteWork(id)
  }

  @ResolveField()
  async partner(@Parent() work: Work): Promise<Partner> {
    return this.partnerService.getPartnerByID(work.partnerId)
  }

  @ResolveField()
  async location(@Parent() work: Work): Promise<Location> {
    const partner = await this.partnerService.getPartnerByID(work.partnerId)
    return this.locationService.getLocationByID(partner.locationId)
  }

  @ResolveField()
  async sector(@Parent() work: Work): Promise<Sector> {
    return this.sectorService.getSectorByID(work.sectorId)
  }
}
