import { ChangeDetectionStrategy, Component, effect, ElementRef, input, viewChild } from '@angular/core';

@Component({
  selector: 'ui-about',
  standalone: true,
  imports: [],
  template: `
    <dialog #modal class="modal">
      <div class="modal-box">
        <h3 class="text-lg font-bold">Hello!</h3>
        <p class="py-4">Press ESC key or click outside to close</p>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutComponent {
  memoized?: string;
  modal = viewChild.required<ElementRef>('modal');
  openModal = input();
  openModalChanges = effect(() => {
    this.openModal();
    if (this.memoized) {
      this.modal().nativeElement.showModal();
    } else {
      this.memoized = 'init';
    }
  });
}
