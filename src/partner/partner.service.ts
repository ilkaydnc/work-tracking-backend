import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { Repository } from 'typeorm';
import { CreatePartnerInput } from './partner.input';
import { v4 as uuid } from 'uuid';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
  ) {}

  async getPartners(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async createPartner(
    createPartnerInput: CreatePartnerInput,
  ): Promise<Partner> {
    const { name, phone, locationId, sectorIds } = createPartnerInput;

    const partner = this.partnerRepository.create({
      id: uuid(),
      name,
      phone: phone,
      locationId,
      sectorIds,
    });

    return this.partnerRepository.save(partner);
  }
}
