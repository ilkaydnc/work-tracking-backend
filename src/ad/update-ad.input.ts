import { InputType, Field, Int } from '@nestjs/graphql'
import { IsOptional, IsUUID, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdateAdInput {
  @IsNotEmpty()
  @IsUUID()
  @Field()
  id: string

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
  @Field({ nullable: true })
  date: Date
}
