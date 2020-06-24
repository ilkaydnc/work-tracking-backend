import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID } from 'class-validator';

@InputType()
export class CreateAdInput {
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

  @IsNotEmpty({ message: 'Date eksik' })
  @Field()
  date: string;
}
