import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-header',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  template: `
    <div class="navbar bg-neutral flex">
      <div class="navbar-start">
        <div class="dropdown">
          <div tabindex="0" role="button" class="btn btn-ghost btn-circle">
            <span class="material-symbols-outlined">menu</span>
          </div>
          <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-neutral rounded-box w-52">
            <li><a>Homepage</a></li>
            <li><a>Portfolio</a></li>
            <li><a>About</a></li>
          </ul>
        </div>
      </div>
      <div class="navbar-center">
        <a routerLink="/" class="btn btn-ghost text-xl">Mon école</a>
      </div>
      <div class="navbar-end">
        <label class="input input-bordered flex items-center gap-2">
          <input type="text" class="grow" placeholder="Recherche" />
          <span class="material-symbols-outlined">search</span>
        </label>
      </div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {}
