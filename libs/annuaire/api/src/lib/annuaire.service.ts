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

  findAll(id: string | null, limit: number | null, codeDepartement: string | null, codeCirconscription: string | null) {
    if (id)
      return this.annuaireRepository.find({
        where: { identifiantDeLEtablissement: id },
      });
    if (limit) return this.annuaireRepository.find({ take: limit });
    if (codeDepartement && codeCirconscription)
      return this.annuaireRepository.find({
        where: [{ codeDepartement: ILike(codeDepartement), codeCirconscription: ILike(codeCirconscription) }],
      });
    if (codeDepartement) return this.annuaireRepository.find({ where: [{ codeDepartement: ILike(codeDepartement) }] });
    if (codeCirconscription)
      return this.annuaireRepository.find({ where: [{ codeCirconscription: ILike(codeCirconscription) }] });
  }

  search(search: string, codeDepartement?: string, codeCirconscription?: string) {
    const searchEtablissement = search
      .split(' ')
      .map(s => `%${s}%`)
      .join(' ');
    const searchCommune = search
      .split(' ')
      .map(s => `%${s}%`)
      .join(' ');
    if (codeDepartement && codeCirconscription) {
      return this.annuaireRepository.find({
        where: [
          {
            nomEtablissement: ILike(searchEtablissement),
            codeDepartement: ILike(codeDepartement),
            codeCirconscription: ILike(codeCirconscription),
          },
          {
            nomCommune: ILike(searchCommune),
            codeDepartement: ILike(codeDepartement),
            codeCirconscription: ILike(codeCirconscription),
          },
        ],
      });
    }

    if (codeDepartement) {
      return this.annuaireRepository.find({
        where: [
          { nomEtablissement: ILike(searchEtablissement), codeDepartement: ILike(codeDepartement) },
          { nomCommune: ILike(searchCommune), codeDepartement: ILike(codeDepartement) },
        ],
      });
    }

    if (codeCirconscription) {
      return this.annuaireRepository.find({
        where: [
          { nomEtablissement: ILike(searchEtablissement), codeCirconscription: ILike(codeCirconscription) },
          { nomCommune: ILike(searchCommune), codeCirconscription: ILike(codeCirconscription) },
        ],
      });
    }
    return this.annuaireRepository.find({
      where: [{ nomEtablissement: ILike(searchEtablissement) }, { nomCommune: ILike(searchCommune) }],
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
