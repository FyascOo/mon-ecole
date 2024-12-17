import { SlicePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnnuaireStore, Circonscription, Departement } from '@mon-ecole/annuaire';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [ReactiveFormsModule, SlicePipe],
  template: `
    <div class="navbar bg-base-100 flex shadow gap-5">
      <div class="flex-none"><ng-content></ng-content></div>
      <div class="flex-none">
        <span class="text-sm w-16 sm:w-full">Annuaire scolaire</span>
      </div>
      <div class="flex-1">
        <select
          [formControl]="departementFC"
          [compareWith]="compareDepartement"
          class="select select-bordered select-xs">
          <option selected [ngValue]="null">-</option>
          @for (departement of annuaireStore.filterDepartements(); track $index) {
          <option [ngValue]="departement">
            {{ departement.codeDepartement | slice : 1 : 3 }}
          </option>
          }
        </select>
      </div>
      <div class="flex-none">
        <button class="btn btn-circle btn-outline btn-sm" (click)="open()">
          <span class="material-symbols-outlined">search</span>
        </button>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  annuaireStore = inject(AnnuaireStore);
  departementFC = new FormControl();
  circonscriptionFC = new FormControl();

  constructor() {
    this.annuaireStore.departementChanges(this.departementFC.valueChanges);
    this.annuaireStore.circonscriptionChanges(this.circonscriptionFC.valueChanges);

    effect(() => {
      this.departementFC.setValue(this.annuaireStore.selectedDepartement());
      this.circonscriptionFC.setValue(this.annuaireStore.selectedCirconscription());
    });
  }

  compareDepartement(a: Departement | null, b: Departement | null) {
    return a?.codeDepartement === b?.codeDepartement;
  }

  compareCirconscription(a: Circonscription | null, b: Circonscription | null) {
    return a?.codeCirconscription === b?.codeCirconscription;
  }

  open() {
    this.annuaireStore.openChanges();
  }
}
