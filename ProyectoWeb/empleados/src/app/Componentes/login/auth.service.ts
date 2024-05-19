import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'diego' && password === '123456') {
      return of(true);
    } else {
      return of(false);
    }
  }
}
