
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-signup', templateUrl: './signup.component.html' })
export class SignupComponent {
  username=''; email=''; password=''; error='';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register(this.username, this.email, this.password).subscribe({
      next: () => {
        this.auth.login(this.username, this.password).subscribe(() => this.router.navigate(['/buses']));
      },
      error: () => this.error = 'Registration failed'
    });
  }
}
