import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import {User} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: User;

  constructor(private http: HttpClient) { }

  login(user: User) {
    this.setUser(user);
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
    .pipe(
      tap(this.setToken)
    );
  }

  setUser(user: User) {
    this.user = user;
  }

  checkUser(): boolean {
    if (this.user.email === 'editor@mail.ru') {
      return false;
    } else {
      return true;
    }
  }

  getUser(): string {
    return this.user.email;
  }

  private setToken(response) {
    if (response) {
      const expData = new Date( new Date().getTime() + +response.expiresIn * 1000);
      localStorage.setItem('fb-token-exp', expData.toString());
      localStorage.setItem('fb-token', response.idToken);
    } else {
      localStorage.clear();
    }

  }

  get token() {
    const expDate = new Date(localStorage.getItem('fb-token-exp'));
    if ( new Date > expDate ) {
      this.logout();
      return null;
    }
    return localStorage.getItem('fb-token');
  }

  logout() {
    this.setToken(null);
  }

  isAuthenticated() {
    return !!this.token;
  }
}
