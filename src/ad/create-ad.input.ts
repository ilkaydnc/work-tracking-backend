import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsDate } from 'class-validator'

@InputType()
export class CreateAdInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  locationId: string

  @IsNotEmpty()
  @IsUUID()
  @Field()
  sectorId: string

  @IsNotEmpty()
  @Field(type => Int)
  amount: number

  @IsNotEmpty()
  @IsDate()
  @Field()
  date: Date
}
