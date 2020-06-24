import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsDateString, IsOptional } from 'class-validator';

@InputType()
export class FilterWorksInput {
  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  partnerId: string;

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  locationId: string;

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  sectorId: string;

  @IsNotEmpty()
  @IsDateString()
  @Field({ nullable: true })
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  @Field({ nullable: true })
  endDate: string;
}
