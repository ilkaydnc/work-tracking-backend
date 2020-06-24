import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

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
  @Field()
  amount: number;

  @IsNotEmpty()
  @Field()
  date: string;
}
