import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AnnuaireStore } from '@mon-ecole/annuaire';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [],
  template: `
    <div class="navbar bg-neutral flex">
      <div class="navbar-start">
        <ng-content></ng-content>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl">Mon école</a>
      </div>
      <div class="navbar-end">
        <select class="select select-bordered w-full max-w-xs">
          <option selected>Département</option>
          @for (departement of annuaireStore.departements(); track $index) {
          <option>{{ departement.codeDepartement }} - {{ departement.libelleDepartement }}</option>
          }
        </select>
        <select class="select select-bordered w-full max-w-xs">
          <option selected>Circonscriprion</option>
          @for (circonscription of annuaireStore.circonscriptions(); track $index) {
          <option>{{ circonscription.codeCirconscription }} - {{ circonscription.nomCirconscription }}</option>
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
}
