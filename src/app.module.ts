import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { GraphQLModule } from '@nestjs/graphql'

import { LocationModule } from './location/location.module'
import { Location } from './location/location.entity'

import { SectorModule } from './sector/sector.module'
import { Sector } from './sector/sector.entity'

import { PartnerModule } from './partner/partner.module'
import { Partner } from './partner/partner.entity'

import { AdModule } from './ad/ad.module'
import { Ad } from './ad/ad.entity'

import { WorkModule } from './work/work.module'
import { Work } from './work/work.entity'

import { AuthModule } from './auth/auth.module'
import { User } from './auth/user.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/worktracking',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Location, Sector, Partner, Ad, Work, User],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ req }),
    }),
    LocationModule,
    SectorModule,
    PartnerModule,
    AdModule,
    WorkModule,
    AuthModule,
  ],
})
export class AppModule {}
