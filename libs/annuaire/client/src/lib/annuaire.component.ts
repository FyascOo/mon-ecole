import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AnnuaireService } from './annuaire.service';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink],
  template: `
    <ul>
      @for (ecole of ecoles$ | async; track $index) {
      <li class="flex">
        {{ ecole.nomEtablissement }}
        <button class="btn-sm" [routerLink]="ecole.identifiantDeLEtablissement">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  ecoles$ = inject(AnnuaireService).getEcoles();
}
