import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AnnuaireService } from './annuaire.service';
import { CreateAnnuaireDto } from './dto/create-annuaire.dto';
import { UpdateAnnuaireDto } from './dto/update-annuaire.dto';

@Controller('annuaire')
export class AnnuaireController {
  constructor(private readonly annuaireService: AnnuaireService) {}

  @Post()
  create(@Body() createAnnuaireDto: CreateAnnuaireDto) {
    return this.annuaireService.create(createAnnuaireDto);
  }

  @Get()
  findAll(@Query('page') page: number) {
    return this.annuaireService.findAll(page);
  }

  @Get('search')
  search(@Query('search') search: string) {
    return this.annuaireService.search(search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.annuaireService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAnnuaireDto: UpdateAnnuaireDto) {
    return this.annuaireService.update(+id, updateAnnuaireDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.annuaireService.remove(+id);
  }
}
