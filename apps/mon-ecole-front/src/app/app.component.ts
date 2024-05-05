import { Component } from '@angular/core';
import { AnnuaireComponent } from '@mon-ecole/annuaire';

@Component({
  standalone: true,
  imports: [AnnuaireComponent],
  selector: 'app-root',
  template: `<lib-annuaire />`,
})
export class AppComponent {}
