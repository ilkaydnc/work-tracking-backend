import { InputType, Field, ID } from '@nestjs/graphql'
import { IsNotEmpty, IsUUID } from 'class-validator'

@InputType()
export class CreatePartnerInput {
  @IsNotEmpty()
  @Field()
  name: string

  @IsNotEmpty()
  @Field()
  phone: string

  @IsUUID()
  @Field()
  locationId: string

  @IsUUID('4', { each: true })
  @Field(() => [ID], { defaultValue: [] })
  sectorIds: string[]
}
