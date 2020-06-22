import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sector } from './sector.entity';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { CreateSectorInput } from './sector.input';
@Injectable()
export class SectorService {
  constructor(
    @InjectRepository(Sector)
    private sectorRepository: Repository<Sector>,
  ) {}

  async getSectors(): Promise<Sector[]> {
    return this.sectorRepository.find();
  }

  async createSector(createSectorInput: CreateSectorInput): Promise<Sector> {
    const { name } = createSectorInput;
    const sector = this.sectorRepository.create({
      id: uuid(),
      name,
    });

    return this.sectorRepository.save(sector);
  }
}
