import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnnuaireStore } from './annuaire.store';
import { EcoleComponent } from './ecole.component';

import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from '@mon-ecole/shared-ui';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, EcoleComponent, ReactiveFormsModule, DialogComponent],
  template: `
    @if (!annuaireStore.hasSelectedDepartement()) {
    <ui-dialog />
    }
    <div class="drawer md:drawer-open">
      <input #drawer id="my-drawer-2" type="checkbox" class="drawer-toggle" />
      <div class="drawer-content flex flex-col p-4 justify-center">
        @if(annuaireStore.ecole()) {
        <lib-ecole />
        } @else {
        <span class="flex justify-center">Aucune école séléctionnée</span>
        }
        <label for="my-drawer-2" class="btn btn-primary drawer-button hidden ">Open drawer</label>
      </div>
      <div class="drawer-side">
        <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
        <ul class="bg-base-200 text-base-content min-h-full w-60 p-4">
          <input
            type="text"
            [formControl]="search"
            placeholder="Recherche"
            class="input input-bordered input-sm w-full max-w-xs" />
          <div class="divider"></div>
          @if(annuaireStore.isLoading()) {
          <span class="loading loading-bars loading-lg"></span>
          } @else { @for (ecole of annuaireStore.ecoles(); track $index) {
          <li (click)="navigateToEcole(ecole.identifiantDeLEtablissement)" class="flex cursor-pointer flex-col">
            <span>{{ ecole.nomCommune }}</span>
            <span class="text-xs italic">{{ ecole.nomEtablissement }}</span>
          </li>
          <div class="divider">φ</div>
          } }
        </ul>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {
  @ViewChild('drawer') drawer: ElementRef;
  annuaireStore = inject(AnnuaireStore);
  router = inject(Router);

  search = new FormControl('', { nonNullable: true });

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
    this.annuaireStore.openChanges();
    this.annuaireStore.setSelectedEcoleId(selectedEcoleId);
  }
}
