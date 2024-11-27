import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <aside class="items-center grid-flow-col">
        <p># Copyright © 2024 - All right reserved</p>
      </aside>

      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        <button routerLink="/a-propos" class="btn btn-outline btn-sm">À propos</button>
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
