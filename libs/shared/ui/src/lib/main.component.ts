import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-main',
  standalone: true,
  imports: [],
  host: {
    class: '',
  },
  template: `
    <div>
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
