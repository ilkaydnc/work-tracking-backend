import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { LocationModule } from './location/location.module';
import { Location } from './location/location.entity';
import { SectorModule } from './sector/sector.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/worktracking',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Location],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LocationModule,
    SectorModule,
  ],
})
export class AppModule {}
