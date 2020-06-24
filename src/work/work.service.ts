import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Work } from './work.entity';
import { Repository, Between } from 'typeorm';
import { FilterWorksInput } from './filter-works.input';
import { CreateWorkInput } from './create-work.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class WorkService {
  constructor(
    @InjectRepository(Work)
    private workRepository: Repository<Work>,
  ) {}

  async getWorks(filterWorksInput: FilterWorksInput): Promise<Work[]> {
    const {
      partnerId,
      locationId,
      sectorId,
      startDate,
      endDate,
    } = filterWorksInput;
    return this.workRepository.find({
      where: {
        $and: [
          {
            partnerId: partnerId,
          },
          {
            locationId: locationId,
          },
          {
            sectorId: sectorId,
          },
        ],
        date: Between(new Date(startDate), new Date(endDate)),
      },
    });
  }

  async getWorkByID(id: string): Promise<Work> {
    const work = await this.workRepository.findOne({ id });

    if (!work)
      throw new NotFoundException(`Not found work with this ID: ${id}`);

    return work;
  }

  async createWork(createWorkInput: CreateWorkInput): Promise<Work> {
    const { partnerId, locationId, sectorId, amount, date } = createWorkInput;

    const work = this.workRepository.create({
      id: uuid(),
      partnerId,
      locationId,
      sectorId,
      amount,
      date,
    });

    return this.workRepository.save(work);
  }
}
