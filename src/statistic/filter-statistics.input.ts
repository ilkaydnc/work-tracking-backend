import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsOptional, IsDate } from 'class-validator'

@InputType()
export class FilterStatisticInput {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  locationId: string

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  sectorId: string

  @IsNotEmpty()
  @IsDate()
  @Field({ nullable: true })
  startDate: Date

  @IsNotEmpty()
  @IsDate()
  @Field({ nullable: true })
  endDate: Date
}
