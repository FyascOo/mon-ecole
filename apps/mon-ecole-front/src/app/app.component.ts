import { AsyncPipe, JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule, AsyncPipe, JsonPipe],
  selector: 'app-root',
  template: `{{ http | async | json }}`,
})
export class AppComponent {
  http = inject(HttpClient).get('http://127.0.0.1:3000/api/test/1');
}
