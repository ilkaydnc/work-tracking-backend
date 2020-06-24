import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ad } from './ad.entity';
import { Repository } from 'typeorm';
import { CreateAdInput } from './create-ad.input';
import { v4 as uuid } from 'uuid';
import { UpdateAdInput } from './update-ad.input';

@Injectable()
export class AdService {
  constructor(
    @InjectRepository(Ad)
    private adRepository: Repository<Ad>,
  ) {}

  async getAds(): Promise<Ad[]> {
    return this.adRepository.find();
  }

  async getAdByID(id: string): Promise<Ad> {
    const ad = await this.adRepository.findOne({ id });

    if (!ad) throw new NotFoundException(`Not found ad with this ID: ${id}`);

    return ad;
  }

  async createAd(createAdInput: CreateAdInput): Promise<Ad> {
    const { locationId, sectorId, amount, date } = createAdInput;

    const ad = this.adRepository.create({
      id: uuid(),
      locationId,
      sectorId,
      amount,
      date,
    });

    return this.adRepository.save(ad);
  }

  async updateAd(updateAdInput: UpdateAdInput): Promise<Ad> {
    const { id, locationId, sectorId, amount, date } = updateAdInput;
    const ad = await this.getAdByID(id);

    if (locationId) ad.locationId = locationId;
    if (sectorId) ad.sectorId = sectorId;
    if (amount) ad.amount = amount;
    if (date) ad.date = date;

    return this.adRepository.save(ad);
  }

  async deleteAd(id: string): Promise<Ad> {
    const ad = await this.getAdByID(id);

    await this.adRepository.delete({ id });

    return ad;
  }
}
