import { ObjectType, Field, ID } from '@nestjs/graphql'

@ObjectType('User')
export class UserType {
  @Field(type => ID)
  id: string

  @Field()
  name: string

  @Field()
  email: string

  @Field()
  token: string
}
