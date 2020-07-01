import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { LocationResolver } from './location.resolver'
import { LocationService } from './location.service'
import { Location } from './location.entity'
import { AuthModule } from 'src/auth/auth.module'
@Module({
  imports: [TypeOrmModule.forFeature([Location]), AuthModule],
  providers: [LocationResolver, LocationService],
  exports: [LocationService],
})
export class LocationModule {}
