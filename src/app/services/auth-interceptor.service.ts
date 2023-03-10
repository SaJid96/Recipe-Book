import { Injectable } from '@angular/core';
import { take,exhaustMap } from 'rxjs/operators';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpParams,
} from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInteceptorService implements HttpInterceptor {

    constructor(private auth:AuthService){}

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    return  this.auth.user
    .pipe(
      take(1),
      exhaustMap((user) => {
        if(!user){
            return next.handle(req)
        }
       const modifiedReq=req.clone({
        params:new HttpParams().set('auth',user.token)
       })
       return next.handle(modifiedReq)
      }))

  }
}
