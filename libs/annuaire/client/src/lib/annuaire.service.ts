import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Annuaire } from '../../../shared/model/annuaire';

@Injectable({
  providedIn: 'root',
})
export class AnnuaireService {
  #http = inject(HttpClient);

  getEcoles() {
    return this.#http.get<Annuaire[]>('http://127.0.0.1:3000/api/annuaire', {
      params: {
        page: 0,
      },
    });
  }
}
