import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PaginationComponent } from '@mon-ecole/shared-ui';
import { AnnuaireStore } from './annuaire.store';
import { EcoleComponent } from './ecole.component';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, PaginationComponent, EcoleComponent],
  template: `
    @if(annuaireStore.isLoading()) {
    <span class="loading loading-bars loading-lg"></span>
    } @else {
    <div class="drawer md:drawer-open">
      <input #drawer id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col items-center justify-center">
        @if(this.annuaireStore.ecole()) {
        <lib-ecole />
        }
        <label for="my-drawer-2" class="btn btn-primary drawer-button hidden ">Open drawer</label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
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

  constructor() {
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
