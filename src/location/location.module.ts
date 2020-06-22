import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationResolver } from './location.resolver';
import { LocationService } from './location.service';
import { Location } from './location.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Location])],
  providers: [LocationResolver, LocationService],
})
export class LocationModule {}
