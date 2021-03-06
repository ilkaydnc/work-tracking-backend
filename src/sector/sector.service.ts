import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Sector } from './sector.entity'
import { getMongoRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { CreateSectorInput } from './sector.input'
@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository = getMongoRepository(Sector)
  ) {}

  async getSectors(): Promise<Sector[]> {
    return this.sectorRepository.find({
      where: {
        is_deleted: { $ne: true },
      },
    })
  }

  async getManySectors(sectorIds: string[]): Promise<Sector[]> {
    return this.sectorRepository.find({
      where: {
        id: {
          $in: sectorIds,
        },
        is_deleted: { $ne: true },
      },
    })
  }

  async getSectorByID(id: string): Promise<Sector> {
    const sector = await this.sectorRepository.findOne({ id })
    if (!sector) throw new NotFoundException(`Not found sector with this ID: ${id}`)

    return sector
  }

  async createSector(createSectorInput: CreateSectorInput): Promise<Sector> {
    const { name } = createSectorInput
    const sector = this.sectorRepository.create({
      id: uuid(),
      name,
    })

    return this.sectorRepository.save(sector)
  }

  async deleteSector(id: string): Promise<Sector> {
    const sector = await this.getSectorByID(id)

    sector.is_deleted = true

    return this.sectorRepository.save(sector)
  }
}
