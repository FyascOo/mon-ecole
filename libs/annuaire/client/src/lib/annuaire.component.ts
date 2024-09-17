import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '@mon-ecole/shared-ui';
import { AnnuaireStore } from './annuaire.store';
import { EcoleComponent } from './ecole.component';

import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginationComponent, EcoleComponent, ReactiveFormsModule],
  template: `
    @if(annuaireStore.isLoading()) {
    <span class="loading loading-bars loading-lg"></span>
    } @else {
    <div class="drawer md:drawer-open">
      <input #drawer id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col p-4 justify-center">
        @if(this.annuaireStore.ecole()) {
        <lib-ecole />
        } @else { Aucune école séléctionné }
        <label for="my-drawer-2" class="btn btn-primary drawer-button hidden ">Open drawer</label>
      </div>
      <div class="drawer-side max-w-80 bg-base-200 text-base-content min-h-full p-4">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <input type="text" placeholder="Recherche" class="input input-bordered input-sm w-full max-w-xs" />

        <div class="divider"></div>
        <ul>
          @for (ecole of annuaireStore.ecoles(); track $index) {
          <li (click)="navigateToEcole(ecole.identifiantDeLEtablissement)" class="flex cursor-pointer flex-col">
            <span>{{ ecole.nomCommune }}</span>
            <span class="text-xs italic">{{ ecole.nomEtablissement }}</span>
          </li>
          <div class="divider">Φ</div>
          }
        </ul>
      </div>
    </div>
    <!-- <ui-pagination /> -->
    }
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  @ViewChild('drawer') drawer: ElementRef;
  annuaireStore = inject(AnnuaireStore);
  router = inject(Router);

  search = new FormControl('');

  constructor() {
    this.annuaireStore.loadBySearch(this.search.valueChanges);
    effect(() => {
      this.annuaireStore.open();
      if (this.drawer) {
        this.drawer.nativeElement.checked = !this.drawer.nativeElement.checked;
      }
    });
  }

  navigateToEcole(selectedEcoleId: string) {
    this.annuaireStore.setSelectedEcoleId(selectedEcoleId);
  }
}
