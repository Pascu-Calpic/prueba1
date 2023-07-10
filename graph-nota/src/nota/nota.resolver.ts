import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { NotaService } from './nota.service';
import { Nota } from './entities/nota.entity';
import { UpdateNotaInput, CreateNotaInput } from './dto/inputs';
import { ParseUUIDPipe } from '@nestjs/common';

@Resolver(() => Nota)
export class NotaResolver {
  constructor(private readonly notaService: NotaService) {}

  @Mutation(() => Nota)
  async createNota(@Args('createNotaInput') createNotaInput: CreateNotaInput)
  :Promise<Nota> {
    return this.notaService.create(createNotaInput);
  }

  @Query(() => [Nota], { name: 'nota' })
  async findAll():Promise<Nota[]> {
    return this.notaService.findAll();
  }

  @Query(() => Nota, { name: 'nota' })
  findOne(@Args('id', { type: () => ID}, ParseUUIDPipe ) id: string): Promise<Nota> {
    return this.notaService.findOne(id);
  }

  @Mutation(() => Nota)
  updateEstudiante(@Args('updateNotaInput') updateNotaInput: UpdateNotaInput): Promise<Nota> {
    return this.notaService.update(updateNotaInput.id, updateNotaInput);
  }

  @Mutation(() => Nota)
  removeEstudiante(@Args('id', { type: () => ID }) id: string): Promise<Nota> {
    return this.notaService.remove(id);
  }
}
