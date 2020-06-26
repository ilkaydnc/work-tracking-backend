import { InputType, Field, ID } from '@nestjs/graphql'
import { IsUUID, IsOptional, IsNotEmpty } from 'class-validator'

@InputType()
export class UpdatePartnerInput {
  @IsUUID()
  @IsNotEmpty()
  @Field()
  id: string

  @IsOptional()
  @Field({ nullable: true })
  name: string

  @IsOptional()
  @Field({ nullable: true })
  phone: string

  @IsUUID()
  @IsOptional()
  @Field({ nullable: true })
  locationId: string

  @IsOptional()
  @IsUUID('4', { each: true })
  @Field(() => [ID], { nullable: true })
  sectorIds: string[]
}
