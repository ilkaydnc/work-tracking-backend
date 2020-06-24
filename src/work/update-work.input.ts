import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, IsOptional } from 'class-validator';

@InputType()
export class UpdateWorkInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string;

  @IsOptional()
  @IsUUID()
  @Field()
  partnerId: string;

  @IsOptional()
  @IsUUID()
  @Field()
  locationId: string;

  @IsOptional()
  @IsUUID()
  @Field()
  sectorId: string;

  @IsOptional()
  @Field()
  amount: number;

  @IsOptional()
  @Field()
  date: string;
}
