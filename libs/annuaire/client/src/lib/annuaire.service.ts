import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Annuaire } from '../../../shared/model/annuaire';
import { Circonscription, Departement } from './annuaire.store';

@Injectable({
  providedIn: 'root',
})
export class AnnuaireService {
  #http = inject(HttpClient);

  getEcoles(id: string | null, departement: Departement | null, circonscription: Circonscription | null) {
    console.log('http', id);
    let params = {};
    if (id) params = { id };
    if (departement) params = { ...params, codeDepartement: departement.codeDepartement };
    if (circonscription) params = { ...params, codeCirconscription: circonscription.codeCirconscription };
    if (!id && !departement && !circonscription) params = { limit: 10 };
    return this.#http.get<Annuaire[]>('http://127.0.0.1:3000/api/annuaire', {
      params,
    });
  }

  search(search: string, departement: Departement | null, circonscription: Circonscription | null) {
    let params: { search: string; codeDepartement?: string; codeCirconscription?: string } = {
      search,
    };
    if (departement) params = { ...params, codeDepartement: departement.codeDepartement };
    if (circonscription) params = { ...params, codeCirconscription: circonscription.codeCirconscription };
    return this.#http.get<Annuaire[]>('http://127.0.0.1:3000/api/annuaire/search', {
      params,
    });
  }

  departements() {
    return this.#http.get<Annuaire[]>('http://127.0.0.1:3000/api/annuaire/departements', {});
  }

  circonscriptions() {
    return this.#http.get<Annuaire[]>('http://127.0.0.1:3000/api/annuaire/circonscriptions', {});
  }
}
