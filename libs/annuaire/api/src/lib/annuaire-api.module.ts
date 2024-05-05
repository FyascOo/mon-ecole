import { Module } from '@nestjs/common';
import { AnnuaireService } from './annuaire.service';
import { AnnuaireController } from './annuaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Annuaire } from './entities/annuaire.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Annuaire])],
  controllers: [AnnuaireController],
  providers: [AnnuaireService],
})
export class AnnuaireApiModule {}
