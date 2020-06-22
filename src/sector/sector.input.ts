import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateSectorInput {
  @MinLength(1)
  @Field()
  name: string;
}
