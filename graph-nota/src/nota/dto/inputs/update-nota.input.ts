import { IsUUID } from 'class-validator';
import { CreateNotaInput } from './create-nota.input';
import { InputType, Field, Int, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateNotaInput extends PartialType(CreateNotaInput) {

  @Field(() => ID)
  @IsUUID()
  id: string;
  
}
