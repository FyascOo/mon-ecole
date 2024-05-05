import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `<div class="diff aspect-[16/9]">
    <div class="diff-item-1">
      <div
        class="bg-primary text-primary-content text-9xl font-black grid place-content-center"
      >
        DAISY
      </div>
    </div>
    <div class="diff-item-2">
      <div class="bg-base-200 text-9xl font-black grid place-content-center">
        DAISY
      </div>
    </div>
    <div class="diff-resizer"></div>
  </div>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {}
