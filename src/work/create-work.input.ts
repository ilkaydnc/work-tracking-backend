import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsDateString } from 'class-validator';

@InputType()
export class CreateWorkInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  partnerId: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  locationId: string;

  @IsNotEmpty()
  @IsUUID()
  @Field()
  sectorId: string;

  @IsNotEmpty()
  @Field(type => Int)
  amount: number;

  @IsNotEmpty()
  @IsDateString()
  @Field()
  date: string;
}
