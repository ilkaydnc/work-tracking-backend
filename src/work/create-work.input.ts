import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsDate } from 'class-validator'

@InputType()
export class CreateWorkInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  partnerId: string

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
  @Field({ nullable: true })
  date: Date
}
