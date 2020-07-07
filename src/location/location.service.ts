import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Location } from './location.entity'
import { getMongoRepository } from 'typeorm'
import { v4 as uuid } from 'uuid'
import { CreateLocationInput } from './location.input'
@Injectable()
export class LocationService {
  constructor(
    @InjectRepository(Location)
    private locationRepository = getMongoRepository(Location)
  ) {}

  async getLocations(): Promise<Location[]> {
    return this.locationRepository.find({
      where: {
        is_deleted: { $ne: true },
      },
    })
  }

  async getLocationByID(id: string): Promise<Location> {
    const location = await this.locationRepository.findOne({ id })

    if (!location) throw new NotFoundException(`Not found location with this ID: ${id}`)

    return location
  }

  async createLocation(createLocationInput: CreateLocationInput): Promise<Location> {
    const { name } = createLocationInput
    const location = this.locationRepository.create({
      id: uuid(),
      name,
    })

    return this.locationRepository.save(location)
  }

  async deleteLocation(id: string): Promise<Location> {
    const location = await this.getLocationByID(id)

    location.is_deleted = true

    return this.locationRepository.save(location)
  }
}
