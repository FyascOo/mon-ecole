import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-annuaire',
  standalone: true,
  imports: [CommonModule],
  template: `<p>annuaire works!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnuaireComponent {}
