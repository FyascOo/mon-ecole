import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'ui-pagination',
  standalone: true,
  imports: [],
  host: {
    class: 'flex-1',
  },
  template: `
    <div class="join">
      <button class="join-item btn"><<</button>
      <button class="join-item btn"><</button>
      <button class="join-item btn">Page {{ page() }}/{{ pageMax() }}</button>
      <button class="join-item btn">></button>
      <button class="join-item btn">>></button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  page = input(0);
  pageMax = input(0);
}
