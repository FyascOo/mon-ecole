import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { AboutComponent } from './about.component';

@Component({
  selector: 'ui-footer',
  standalone: true,
  imports: [AboutComponent],
  template: `
    <footer class="footer items-center justify-between bg-base-200  text-neutral-content flex p-1">
      <aside class="items-center grid-flow-col">
        <div class="flex text-base-content gap-1">
          <a
            class="flex items-center text-blue-800 underline underline-offset-2"
            href="https://classeadeux.fr/"
            target="_blank"
            rel="noopener">
            Classeadeux
          </a>
          et
          <a
            class="flex items-center text-blue-800 underline underline-offset-2"
            href="https://alan.choufa.fr"
            target="_blank"
            rel="noopener">
            Alan
          </a>
        </div>
      </aside>

      <nav class="grid-flow-col justify-self-end">
        <button (click)="clickEventChanges()" class="btn btn-outline btn-xs">À propos</button>
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
