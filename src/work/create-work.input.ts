import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsDate, IsOptional } from 'class-validator'

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

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  date: string
}
