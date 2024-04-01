import { Injectable } from '@angular/core';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor(private servicioLogin: LoginService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('jwtoken');
    if (token) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', `${token}`)
      });

      return next.handle(clonedReq);
    } else {
      return next.handle(req);
    }
  }
}
