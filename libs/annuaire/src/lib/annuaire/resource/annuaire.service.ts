import { Injectable } from '@nestjs/common';
import { CreateAnnuaireDto } from './dto/create-annuaire.dto';
import { UpdateAnnuaireDto } from './dto/update-annuaire.dto';

@Injectable()
export class AnnuaireService {
  create(createAnnuaireDto: CreateAnnuaireDto) {
    return 'This action adds a new annuaire';
  }

  findAll() {
    return `This action returns all annuaire`;
  }

  findOne(id: number) {
    return `This action returns a #${id} annuaire`;
  }

  update(id: number, updateAnnuaireDto: UpdateAnnuaireDto) {
    return `This action updates a #${id} annuaire`;
  }

  remove(id: number) {
    return `This action removes a #${id} annuaire`;
  }
}
