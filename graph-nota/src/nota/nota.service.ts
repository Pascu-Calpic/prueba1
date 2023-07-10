import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNotaInput, UpdateNotaInput } from './dto/inputs';
import { Nota } from './entities/nota.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class NotaService {

  constructor( 
    @InjectRepository(Nota)
    private readonly notaRepository:Repository<Nota> ){}

  async create(createNotaInput: CreateNotaInput): Promise<Nota>  {
    const newNota= this.notaRepository.create(createNotaInput);
    return await this.notaRepository.save(newNota); 
  }

  async findAll(): Promise<Nota[]> {
    return this.notaRepository.find();
  }

  async findOne(id: string): Promise<Nota> {
     const nota= await  this.notaRepository.findOneBy({id});
     if (!nota) throw new NotFoundException(`Not found`)
     return nota;
  }

  async update(id: string, updateNotaInput: UpdateNotaInput): Promise<Nota> {
    
    const nota = await this.notaRepository.preload(updateNotaInput);
    if (!nota) throw new NotFoundException(`Not found`)
    return this.notaRepository.save(nota);

  }

  async remove(id: string): Promise<Nota> {

    const nota= await  this.findOne(id);

    await this.notaRepository.remove(nota);

    return {...nota, id};

  }
}
