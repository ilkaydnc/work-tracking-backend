import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Work } from 'src/work/work.entity'
import { getMongoRepository } from 'typeorm'
import { Ad } from 'src/ad/ad.entity'
import { FilterStatisticInput } from './filter-statistics.input'
import { FilteredStatisticType } from './filtered-statistic.type'
import { TotalStatisticType } from './all-statistics.type'

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Work)
    private workRepository = getMongoRepository(Work),
    @InjectRepository(Ad)
    private adRepository = getMongoRepository(Ad)
  ) {}

  async getAllStatistics(): Promise<TotalStatisticType> {
    const works_amounts = await this.workRepository
      .aggregate([
        { $match: { is_deleted: { $ne: true } } },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()
    const ads_amounts = await this.adRepository
      .aggregate([
        { $match: { is_deleted: { $ne: true } } },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()

    const works_total = works_amounts.length ? this.getTotal(works_amounts) : 0
    const ads_total = ads_amounts.length ? this.getTotal(ads_amounts) : 0

    return { works_total, ads_total }
  }

  async getStatisticsWithFilter(
    filterStatisticsInput: FilterStatisticInput
  ): Promise<FilteredStatisticType> {
    const { locationId, sectorId, startDate, endDate } = filterStatisticsInput

    const works_amounts = await this.workRepository
      .aggregate([
        {
          $match: {
            [locationId && 'locationId']: { $eq: locationId },
            [sectorId && 'sectorId']: { $eq: sectorId },
            date: { $gte: new Date(startDate), $lt: new Date(endDate) },
            is_deleted: { $ne: true },
          },
        },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()
    const ads_amounts = await this.adRepository
      .aggregate([
        {
          $match: {
            [locationId && 'locationId']: { $eq: locationId },
            [sectorId && 'sectorId']: { $eq: sectorId },
            date: { $gte: new Date(startDate), $lt: new Date(endDate) },
            is_deleted: { $ne: true },
          },
        },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()

    const filtered_works_total = works_amounts.length ? this.getTotal(works_amounts) : 0
    const filtered_ads_total = ads_amounts.length ? this.getTotal(ads_amounts) : 0

    return { filtered_works_total, filtered_ads_total }
  }

  getTotal(arr: any[]): number {
    return arr.reduce((a, b) => a + b.total, 0)
  }
}
