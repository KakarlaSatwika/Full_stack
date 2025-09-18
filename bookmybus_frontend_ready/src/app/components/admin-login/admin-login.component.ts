
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html'
})
export class AdminLoginComponent {
  username='admin'; password='admin123'; error='';

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    this.auth.login(this.username, this.password).subscribe(ok => {
      if (ok && this.username === 'admin') this.router.navigate(['/admin/dashboard']);
      else this.error = 'Invalid admin credentials';
    });
  }
}
