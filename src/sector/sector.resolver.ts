import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { SectorType } from './sector.type'
import { SectorService } from './sector.service'
import { Sector } from './sector.entity'
import { CreateSectorInput } from './sector.input'

@Resolver(of => SectorType)
export class SectorResolver {
  constructor(private sectorService: SectorService) {}

  @Query(returns => [SectorType])
  sectors(): Promise<Sector[]> {
    return this.sectorService.getSectors()
  }

  @Mutation(returns => SectorType)
  createSector(@Args('createSectorInput') createSectorInput: CreateSectorInput): Promise<Sector> {
    return this.sectorService.createSector(createSectorInput)
  }

  @Mutation(returns => SectorType)
  deleteSector(@Args('id') id: string): Promise<Sector> {
    return this.sectorService.deleteSector(id)
  }
}
