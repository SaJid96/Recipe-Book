import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import {  throwError ,BehaviorSubject} from 'rxjs';
import { User } from '../models/user.model';

export interface AuthResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string) {
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
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  signIn(email: string, password: string) {
    return this.http
      .post<AuthResponse>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFMsc3LUJlx7Koftf7kLiLSylq8RZEfjU',
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.errorHandler),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  logout(){
    this.user.next(null)
  }

  private handleAuthentication(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.user.next(user);
  }

  private errorHandler(errorRes: HttpErrorResponse) {
    let errormessage = 'An error message occured';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errormessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errormessage = 'This email exists already';
        break;

      case 'EMAIL_NOT_FOUND':
        errormessage = 'the email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errormessage = 'The password is invalid ';
    }
    return throwError(errormessage);
  }
}
