import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Work } from './work.entity'
import { getMongoRepository } from 'typeorm'
import { FilterWorksInput } from './filter-works.input'
import { CreateWorkInput } from './create-work.input'
import { v4 as uuid } from 'uuid'
import { UpdateWorkInput } from './update-work.input'

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository = getMongoRepository(Work)
  ) {}

  async getWorks(): Promise<Work[]> {
    return this.workRepository.find({})
  }

  async getWorksWithFilter(filterWorksInput: FilterWorksInput): Promise<Work[]> {
    const { partnerId, locationId, sectorId, startDate, endDate } = filterWorksInput

    return this.workRepository.find({
      where: {
        [partnerId && 'partnerId']: { $eq: partnerId },
        [locationId && 'locationId']: { $eq: locationId },
        [sectorId && 'sectorId']: { $eq: sectorId },
        date: { $gte: new Date(startDate), $lt: new Date(endDate) },
        is_deleted: { $ne: true },
      },
      order: {
        updated_at: 'DESC',
      },
    })
  }

  async getWorkByID(id: string): Promise<Work> {
    const work = await this.workRepository.findOne({ id })

    if (!work) throw new NotFoundException(`Not found work with this ID: ${id}`)

    return work
  }

  async createWork(createWorkInput: CreateWorkInput): Promise<Work> {
    const { partnerId, locationId, sectorId, amount, date } = createWorkInput

    const work = this.workRepository.create({
      id: uuid(),
      partnerId,
      locationId,
      sectorId,
      amount,
      date: new Date(date),
    })

    return this.workRepository.save(work)
  }

  async updateWork(updateWorkInput: UpdateWorkInput): Promise<Work> {
    const { id, partnerId, locationId, sectorId, amount, date } = updateWorkInput

    const work = await this.getWorkByID(id)

    if (partnerId) work.partnerId = partnerId
    if (locationId) work.locationId = locationId
    if (sectorId) work.sectorId = sectorId
    if (amount) work.amount = amount
    if (date) work.date = new Date(date)

    return this.workRepository.save(work)
  }

  async deleteWork(id: string): Promise<Work> {
    const work = await this.getWorkByID(id)

    work.is_deleted = true

    return this.workRepository.save(work)
  }
}
