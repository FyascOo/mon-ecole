import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ui-main',
  standalone: true,
  imports: [],
  template: ` <ng-content></ng-content> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {}
