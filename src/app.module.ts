import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';

import { LocationModule } from './location/location.module';
import { Location } from './location/location.entity';
import { SectorModule } from './sector/sector.module';
import { Sector } from './sector/sector.entity';
import { PartnerModule } from './partner/partner.module';
import { Partner } from './partner/partner.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/worktracking',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Location, Sector, Partner],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LocationModule,
    SectorModule,
    PartnerModule,
  ],
})
export class AppModule {}
