import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Work } from 'src/work/work.entity'
import { getMongoRepository } from 'typeorm'
import { Ad } from 'src/ad/ad.entity'
import { FilterStatisticInput } from './filter-statistics.input'
import { StatisticType } from './statistics.type'

@Injectable()
export class StatisticService {
  constructor(
    @InjectRepository(Work)
    private workRepository = getMongoRepository(Work),
    @InjectRepository(Ad)
    private adRepository = getMongoRepository(Ad)
  ) {}

  async getAllStatistics(): Promise<StatisticType> {
    const total = await this.workRepository
      .aggregate([
        { $match: { is_deleted: { $ne: true } } },
        { $project: { total: { $sum: '$amount' } } },
      ])
      .toArray()

    const ads_amounts = await this.adRepository
      .aggregate([
        { $match: { is_deleted: { $ne: true } } },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()

    const works_total = total.length ? this.getTotal(total) : 0
    const ads_total = ads_amounts.length ? this.getTotal(ads_amounts) : 0

    return { works_total, ads_total }
  }

  async getStatisticsWithFilter(
    filterStatisticsInput: FilterStatisticInput
  ): Promise<StatisticType> {
    const { locationId, sectorId, partnerId, startDate, endDate } = filterStatisticsInput

    const works_amounts = await this.workRepository
      .aggregate([
        {
          $match: {
            [partnerId && 'partnerId']: { $eq: partnerId },
            [locationId && 'locationId']: { $eq: locationId },
            [sectorId && 'sectorId']: { $eq: sectorId },
            date: {
              $gte: new Date(startDate),
              $lt: new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate(),
                23,
                59,
                59
              ),
            },
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
            date: {
              $gte: new Date(startDate),
              $lt: new Date(
                endDate.getFullYear(),
                endDate.getMonth(),
                endDate.getDate(),
                23,
                59,
                59
              ),
            },
            is_deleted: { $ne: true },
          },
        },
        { $project: { total: { $add: '$amount' } } },
      ])
      .toArray()

    const works_total = works_amounts.length ? this.getTotal(works_amounts) : 0
    const ads_total = ads_amounts.length ? this.getTotal(ads_amounts) : 0

    return { works_total, ads_total }
  }

  getTotal(arr: any[]): number {
    return arr.reduce((a, b) => a + b.total, 0)
  }
}
