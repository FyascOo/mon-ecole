import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent, HeaderComponent, MainComponent } from '@mon-ecole/shared-ui';

@Component({
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MainComponent, RouterOutlet],
  selector: 'app-root',
  host: { class: 'flex flex-col flex-1' },
  template: `
    <ui-header />
    <ui-main><router-outlet /></ui-main>
    <ui-footer />
  `,
})
export class AppComponent {}
