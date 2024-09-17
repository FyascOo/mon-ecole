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
  search(@Query('search') search: string) {
    return this.annuaireService.search(search);
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
