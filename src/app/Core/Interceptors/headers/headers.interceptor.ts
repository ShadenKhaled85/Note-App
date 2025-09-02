import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if(localStorage.getItem('token') !== null){
    req = req.clone({
      setHeaders: {
        token : `3b8ny__${localStorage.getItem('token')}`
      }
    })
  }

  return next(req);
};
