import { Module } from '@nestjs/common';
import { AnnuaireService } from './annuaire.service';
import { AnnuaireController } from './annuaire.controller';

@Module({
  controllers: [AnnuaireController],
  providers: [AnnuaireService],
})
export class AnnuaireModule {}
