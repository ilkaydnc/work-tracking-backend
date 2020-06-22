import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { GraphQLModule } from '@nestjs/graphql';
import { LocationModule } from './location/location.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/worktracking',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LocationModule,
  ],
})
export class AppModule {}
