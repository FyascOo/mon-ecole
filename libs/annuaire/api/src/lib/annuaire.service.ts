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

  search(search: string, codeDepartement?: string, codeCirconscription?: string) {
    if (codeDepartement && codeCirconscription) {
      return this.annuaireRepository.find({
        where: [
          {
            nomEtablissement: ILike(`%${search}%`),
            codeDepartement: ILike(`${codeDepartement}`),
            codeCirconscription: ILike(`%${codeCirconscription}%`),
          },
          {
            nomCommune: ILike(`%${search}%`),
            codeDepartement: ILike(`${codeDepartement}`),
            codeCirconscription: ILike(`%${codeCirconscription}%`),
          },
        ],
      });
    }

    if (codeDepartement) {
      return this.annuaireRepository.find({
        where: [
          { nomEtablissement: ILike(`%${search}%`), codeDepartement: ILike(`${codeDepartement}`) },
          { nomCommune: ILike(`%${search}%`), codeDepartement: ILike(`${codeDepartement}`) },
        ],
      });
    }

    if (codeCirconscription) {
      return this.annuaireRepository.find({
        where: [
          { nomEtablissement: ILike(`%${search}%`), codeCirconscription: ILike(`${codeCirconscription}`) },
          { nomCommune: ILike(`%${search}%`), codeCirconscription: ILike(`${codeCirconscription}`) },
        ],
      });
    }
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
