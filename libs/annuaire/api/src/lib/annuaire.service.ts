import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { Annuaire } from './entities/annuaire.entity';

@Injectable()
export class AnnuaireService {
  constructor(
    @InjectRepository(Annuaire)
    private annuaireRepository: Repository<Annuaire>
  ) {}

  findAll(page: number) {
    const skip = page * 20;
    return this.annuaireRepository.find({
      take: 10,
      skip,
    });
  }

  search(search: string) {
    return this.annuaireRepository.find({
      where: [{ nomEtablissement: ILike(`%${search}%`) }, { nomCommune: ILike(`%${search}%`) }],
    });
  }

  departements() {
    return this.annuaireRepository
      .createQueryBuilder('annuaire')
      .select(['annuaire.codeDepartement', 'annuaire.libelleDepartement'])
      .distinctOn(['annuaire.codeDepartement'])
      .orderBy({ 'annuaire.codeDepartement': 'ASC' })
      .getMany();
  }

  circonscriptions() {
    return this.annuaireRepository
      .createQueryBuilder('annuaire')
      .select(['annuaire.codeCirconscription', 'annuaire.nomCirconscription', 'annuaire.codeDepartement'])
      .distinctOn(['annuaire.nomCirconscription'])
      .orderBy({ 'annuaire.nomCirconscription': 'ASC' })
      .getMany();
  }
}
