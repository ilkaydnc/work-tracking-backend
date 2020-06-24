import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkResolver } from './work.resolver';

@Module({
  providers: [WorkService, WorkResolver]
})
export class WorkModule {}
