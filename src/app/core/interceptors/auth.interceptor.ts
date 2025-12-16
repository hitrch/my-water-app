import { HttpInterceptorFn, HttpRequest } from '@angular/common/http'

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next) => {
  const token = localStorage.getItem('token')

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return next(req)
}
