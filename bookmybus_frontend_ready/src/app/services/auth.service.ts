
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = `${environment.apiUrl}/users`;
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || 'null'));

  constructor(private http: HttpClient, private router: Router) {}

  get currentUser() { return this.currentUserSubject.value; }
  isLoggedIn(): boolean { return !!this.currentUser; }
  isAdmin(): boolean { return this.currentUser && this.currentUser.role === 'ADMIN'; }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this.api}/login`, { username, password }, { responseType: 'text' })
      .pipe(
        map(_ => {
          const user = { username, role: username === 'admin' ? 'ADMIN' : 'USER' };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return true;
        }),
        catchError(() => of(false))
      );
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  register(username: string, email: string, password: string) {
    return this.http.post(`${this.api}/register`, { username, email, password });
  }
}
