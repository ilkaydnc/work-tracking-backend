import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Partner } from './partner.entity';
import { Repository } from 'typeorm';
import { CreatePartnerInput } from './create-partner.input';
import { v4 as uuid } from 'uuid';
import { UpdatePartnerInput } from './update-partner.input';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private partnerRepository: Repository<Partner>,
  ) {}

  async getPartners(): Promise<Partner[]> {
    return this.partnerRepository.find();
  }

  async getPartnerByID(id: string): Promise<Partner> {
    const partner = await this.partnerRepository.findOne({ id });

    if (!partner)
      throw new NotFoundException(`Not found partner with this ID: ${id}`);

    return partner;
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

  async updatePartner(
    updatePartnerInput: UpdatePartnerInput,
  ): Promise<Partner> {
    const { id, name, phone, locationId, sectorIds } = updatePartnerInput;
    const partner = await this.getPartnerByID(id);

    if (name) partner.name = name;
    if (phone) partner.phone = phone;
    if (locationId) partner.locationId = locationId;
    if (sectorIds) partner.sectorIds = sectorIds;

    return this.partnerRepository.save(partner);
  }

  async deletePartner(id: string): Promise<Partner> {
    const partner = await this.getPartnerByID(id);

    await this.partnerRepository.delete({ id });

    return partner;
  }
}
