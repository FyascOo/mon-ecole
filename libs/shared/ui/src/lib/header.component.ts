import { ChangeDetectionStrategy, Component } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="navbar bg-neutral flex">
      <div class="navbar-start">
        <ng-content></ng-content>
      </div>
      <div class="navbar-center">
        <a routerLink="/" class="btn btn-ghost text-xl">Mon école</a>
      </div>
      <div class="navbar-end">
        <label class="input input-bordered flex items-center gap-2">
          <input [formControl]="search" type="text" class="grow" placeholder="Recherche" />
          <!-- <span class="material-symbols-outlined">search</span> -->
        </label>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  search = new FormControl('');
  searchChanges = outputFromObservable(this.search.valueChanges);
}
