import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-main',
  standalone: true,
  imports: [],
  host: {
    class: 'flex-1 p-5 flex justify-center',
  },
  template: `
    <div class="xl:w-1/3 lg:w-1/2">
      <ng-content></ng-content>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
