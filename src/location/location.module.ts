import { Module } from '@nestjs/common';
import { LocationResolver } from './location.resolver';

@Module({
  providers: [LocationResolver],
})
export class LocationModule {}
