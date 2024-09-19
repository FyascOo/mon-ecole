import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AnnuaireStore } from '@mon-ecole/annuaire';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="navbar bg-neutral flex">
      <div class="content-start">
        <ng-content></ng-content>
      </div>
      <div class=" max-md:hidden navbar-center flex justify-center">
        <a class="btn btn-ghost text-xl">Mon école</a>
      </div>
      <div class="navbar-end flex-1">
        <select [formControl]="departementFC" class="select select-bordered w-full max-w-xs">
          <option selected [ngValue]="null">Département</option>
          @for (departement of annuaireStore.filterDepartements(); track $index) {
          <option [ngValue]="departement">
            {{ departement.codeDepartement }} - {{ departement.libelleDepartement }}
          </option>
          }
        </select>
        <select [formControl]="circonscriptionFC" class="select select-bordered w-full max-w-xs">
          <option selected [ngValue]="null">Circonscription</option>
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
  }
}
