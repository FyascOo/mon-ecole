import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [AsyncPipe, JsonPipe],
  template: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
  corporis doloremque sequi fugit voluptatem obcaecati dolores quaerat nesciunt,
  ducimus nobis. Alias eaque perspiciatis nam blanditiis inventore laudantium
  sequi id cupiditate.`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {}
