import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnnuaireStore } from '@mon-ecole/annuaire';
import { FooterComponent, HeaderComponent, MainComponent } from '@mon-ecole/shared-ui';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainComponent, RouterOutlet],
  selector: 'app-root',
  host: { class: 'flex flex-col flex-1' },
  template: `
    <ui-header>
      <div class="avatar cursor-pointer">
        <div class="w-10 rounded-full">
          <img class="" src="assets/school_search.png" alt="" />
        </div>
      </div>
    </ui-header>
    <ui-main><router-outlet /></ui-main>
    <ui-footer />
  `,
})
export class AppComponent {
  annuaireStore = inject(AnnuaireStore);
}
