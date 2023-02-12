import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  signup(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFMsc3LUJlx7Koftf7kLiLSylq8RZEfjU',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResp:any) => {
          let errormessage = 'An error message occured';
          if (!errorResp.error || !errorResp.error.error) {
            return throwError(errormessage);
          }
          switch (errorResp.error.error.message) {
            case 'EMAIL_EXISTS':
              errormessage = 'This email exists already';
          }
          return throwError(errormessage)
        })
      );
  }
}
