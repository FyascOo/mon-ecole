import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '@mon-ecole/shared-ui';
import { AnnuaireStore } from './annuaire.store';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginationComponent],
  template: `
    @if(annuaireStore.isLoading()) {
    <span class="loading loading-bars loading-lg"></span>
    } @else {
    <ul>
      @for (ecole of annuaireStore.ecoles(); track $index) {
      <li class="flex">
        {{ ecole.nomCommune }} :
        {{ ecole.nomEtablissement }}
        <button class="btn-sm" (click)="navigateToEcole(ecole.identifiantDeLEtablissement)">
          <span class="material-symbols-outlined">arrow_forward</span>
        </button>
      </li>
      }
    </ul>
    <!-- <ui-pagination /> -->
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  annuaireStore = inject(AnnuaireStore);
  router = inject(Router);

  navigateToEcole(selectedEcoleId: string) {
    this.annuaireStore.setSelectedEcoleId(selectedEcoleId);
    this.router.navigate([selectedEcoleId]);
  }
}
