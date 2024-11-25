import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [],
  template: `
    <footer class="footer items-center p-4 bg-neutral text-neutral-content">
      <aside class="items-center grid-flow-col">
        <p># Copyright © 2024 - All right reserved</p>
      </aside>
      <nav class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        A propos
      </nav>
    </footer>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {}
