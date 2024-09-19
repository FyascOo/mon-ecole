import { Controller, Get, Query } from '@nestjs/common';
import { AnnuaireService } from './annuaire.service';

@Controller('annuaire')
export class AnnuaireController {
  constructor(private readonly annuaireService: AnnuaireService) {}

  @Get()
  findAll(@Query('page') page: number) {
    return this.annuaireService.findAll(page);
  }

  @Get('search')
  search(
    @Query('search') search: string,
    @Query('codeDepartement') codeDepartement?: string,
    @Query('codeCirconscription') codeCirconscription?: string
  ) {
    return this.annuaireService.search(search, codeDepartement, codeCirconscription);
  }

  @Get('departements')
  departements() {
    return this.annuaireService.departements();
  }

  @Get('circonscriptions')
  circonscriptions() {
    return this.annuaireService.circonscriptions();
  }
}
