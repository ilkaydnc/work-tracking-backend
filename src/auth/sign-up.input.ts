import { InputType, Field } from '@nestjs/graphql'
import { IsEmail, MinLength, MaxLength } from 'class-validator'

@InputType()
export class SignUpInput {
  @MinLength(3)
  @MaxLength(32)
  @Field()
  name: string

  @IsEmail()
  @Field()
  email: string

  @MinLength(8)
  @Field()
  password: string
}
