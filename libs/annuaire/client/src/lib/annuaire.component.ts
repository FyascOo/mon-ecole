import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PaginationComponent } from '@mon-ecole/shared-ui';
import { AnnuaireService } from './annuaire.service';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, PaginationComponent],
  template: `
    @if(ecoles$ | async; as ecoles) {
    <ul>
      @for (ecole of ecoles; track $index) {
      <li class="flex">
        {{ ecole.nomEtablissement }}
        <button class="btn-sm" [routerLink]="ecole.identifiantDeLEtablissement">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </li>
      }
    </ul>
    <ui-pagination />
    } @else {
    <span class="loading loading-bars loading-lg"></span>
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  ecoles$ = inject(AnnuaireService).getEcoles();
}
