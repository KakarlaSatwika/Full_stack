
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe(ok => {
      if (ok) {
        if (this.username === 'admin') this.router.navigate(['/admin/dashboard']);
        else this.router.navigate(['/buses']);
      } else {
        this.error = 'Invalid credentials';
      }
    });
  }
}
