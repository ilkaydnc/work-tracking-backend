import { InputType, Field, Int } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID, IsOptional, IsDate } from 'class-validator'

@InputType()
export class UpdateWorkInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  partnerId: string

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  locationId: string

  @IsOptional()
  @IsUUID()
  @Field({ nullable: true })
  sectorId: string

  @IsOptional()
  @Field(type => Int, { nullable: true })
  amount: number

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  date: string
}
