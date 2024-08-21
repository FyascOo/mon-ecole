import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateAnnuaireDto } from './dto/create-annuaire.dto';
import { UpdateAnnuaireDto } from './dto/update-annuaire.dto';
import { Annuaire } from './entities/annuaire.entity';

@Injectable()
export class AnnuaireService {
  constructor(
    @InjectRepository(Annuaire)
    private annuaireRepository: Repository<Annuaire>
  ) {}
  create(createAnnuaireDto: CreateAnnuaireDto) {
    return 'This action adds a new annuaire';
  }

  findAll(page: number) {
    const skip = page * 20;
    return this.annuaireRepository.find({
      take: 10,
      skip,
    });
  }

  search(search: string) {
    return this.annuaireRepository.find({
      where: { nomEtablissement: Like(`%${search}%`) },
      take: 10,
    });
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
