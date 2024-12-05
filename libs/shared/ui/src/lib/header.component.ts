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
      <div class="content-start">
        <ng-content></ng-content>
      </div>
      <div class=" navbar-center flex justify-center gap-4">
        <span class="text-xl">École du</span>
        <select
          [formControl]="departementFC"
          [compareWith]="compareDepartement"
          class="select select-bordered select-sm">
          <option selected [ngValue]="null">-</option>
          @for (departement of annuaireStore.filterDepartements(); track $index) {
          <option [ngValue]="departement">
            {{ departement.codeDepartement | slice : 1 : 3 }}
          </option>
          }
        </select>
        <select
          [formControl]="circonscriptionFC"
          [compareWith]="compareCirconscription"
          class="max-sm:hidden select select-bordered w-40 select-sm">
          <option selected [ngValue]="null">circonscription</option>
          @for (circonscription of annuaireStore.filterCirconscriptions(); track $index) {
          <option [ngValue]="circonscription">
            {{ circonscription.codeCirconscription }} - {{ circonscription.nomCirconscription }}
          </option>
          }
        </select>
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
}
