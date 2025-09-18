import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  year: number = new Date().getFullYear();   // ✅ Add this line

  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
  }
}
