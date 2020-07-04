import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Work } from 'src/work/work.entity'
import { getMongoRepository } from 'typeorm'
import { Ad } from 'src/ad/ad.entity'
import { FilterStatisticInput } from './filter-statistics.input'
@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Work)
    private workRepository = getMongoRepository(Work),
    @InjectRepository(Ad)
    private adRepository = getMongoRepository(Ad)
  ) {}

  async getStatisticsWithFilter(filterStatisticsInput: FilterStatisticInput): Promise<any> {
    const { locationId, sectorId, startDate, endDate } = filterStatisticsInput
    const works_total = await this.workRepository.aggregate([
      {
        $match: {
          [locationId && 'locationId']: { $eq: locationId },
          [sectorId && 'sectorId']: { $eq: sectorId },
          date: { $gte: new Date(startDate), $lt: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' },
        },
      },
    ])

    const ads_total = await this.adRepository.aggregate([
      {
        $match: {
          [locationId && 'locationId']: { $eq: locationId },
          [sectorId && 'sectorId']: { $eq: sectorId },
          date: { $gte: new Date(startDate), $lt: new Date(endDate) },
        },
      },
      {
        $group: {
          _id: { id: '$id' },
          total: { $sum: '$amount' },
        },
      },
    ])

    return { works_total, ads_total }
  }
}
