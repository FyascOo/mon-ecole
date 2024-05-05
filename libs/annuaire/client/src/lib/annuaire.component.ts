import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `ça marche`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  param = new HttpParams().append('page', 0);
  http = inject(HttpClient)
    .get('http://127.0.0.1:3000/api/annuaire', { params: this.param })
    .subscribe(console.log);
}
