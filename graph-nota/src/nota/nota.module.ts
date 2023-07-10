import { Module } from '@nestjs/common';
import { NotaService } from './nota.service';
import { NotaResolver } from './nota.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nota } from './entities/nota.entity';

@Module({
  providers: [NotaResolver, NotaService],
  imports:[
    TypeOrmModule.forFeature([Nota])
  ]
})
export class NotaModule {}
