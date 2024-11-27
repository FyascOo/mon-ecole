import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-a-propos',
  standalone: true,
  imports: [],
  template: `
    A propos
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {}
