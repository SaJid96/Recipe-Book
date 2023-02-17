import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

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
  private tokenExpirationTimer:any
  constructor(private http: HttpClient,private router:Router) {}

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

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }
    const loadUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadUser.token) {
      this.user.next(loadUser);
      const expirationDate=new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();

      this.autoLogout(expirationDate)
    }
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }
    this.tokenExpirationTimer=null
  }

  autoLogout(expirationDate:number){

   this.tokenExpirationTimer= setTimeout(()=>{
      this.logout()
    },expirationDate)
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
    this.autoLogout(expiresIn *1000)
    localStorage.setItem('userData', JSON.stringify(user));
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
