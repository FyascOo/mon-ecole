import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnnuaireService } from './annuaire.service';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `
    <ul>
      @for (ecole of ecoles$ | async; track $index) {
      <li>{{ ecole.nomEtablissement }}: {{ ecole.adresse1 }} {{ ecole.codePostal }} {{ ecole.nomCommune }}</li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  ecoles$ = inject(AnnuaireService).getEcoles();
}
