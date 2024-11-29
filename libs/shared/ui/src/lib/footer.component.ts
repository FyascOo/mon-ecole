import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AboutComponent } from './about.component';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [AboutComponent],
  template: `
    <footer class="footer items-center justify-between p-4 bg-neutral text-neutral-content flex ">
      <aside class="items-center grid-flow-col">
        <p># Copyright © 2024 - All right reserved</p>
      </aside>

      <nav class="grid-flow-col gap-4 justify-self-end">
        <button (click)="clickEventChanges()" class="btn btn-outline btn-sm">À propos</button>
      </nav>
    </footer>
    <ui-about [openModal]="clickEvent()" />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  clickEvent = signal(true);
  clickEventChanges() {
    this.clickEvent.update(v => !v);
  }
}
