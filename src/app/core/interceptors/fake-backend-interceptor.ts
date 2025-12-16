import { HttpInterceptorFn, HttpResponse } from '@angular/common/http'
import { of, throwError } from 'rxjs'
import { delay } from 'rxjs/operators'
import { AuthUser, LoginResponse } from '../../shared/models/auth.model'
import { isLoginRequest, isRegisterRequest } from '../../shared/validators/auth.validators'

// In-memory database
const fakeUsers: AuthUser[] = [
  { email: 'test@mail.com', password: '123456', token: 'fake-jwt-token' }
]

export const fakeBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const body = req.body

  // LOGIN
  if (req.url.endsWith('/auth/login') && req.method === 'POST') {
    if (!isLoginRequest(body)) {
      return throwError(() => ({
        status: 400,
        error: { message: 'Invalid request body' }
      }))
    }

    const { email, password } = body
    const user = fakeUsers.find(u => u.email === email && u.password === password)

    if (user) {
      const response: LoginResponse = {
        accessToken: user.token,
        user: { email: user.email }
      }
      return of(new HttpResponse({ status: 200, body: response })).pipe(delay(500))
    }

    return throwError(() => ({
      status: 401,
      error: { message: 'Invalid email or password' }
    }))
  }

  // REGISTER
  if (req.url.endsWith('/auth/register') && req.method === 'POST') {
    if (!isRegisterRequest(body)) {
      return throwError(() => ({
        status: 400,
        error: { message: 'Invalid request body' }
      }))
    }

    const { email, password} = body

    if (fakeUsers.find(u => u.email === email)) {
      return throwError(() => ({
        status: 409,
        error: { message: 'Email already exists' }
      }))
    }

    const newUser: AuthUser = { email, password, token: 'fake-jwt-token' }
    fakeUsers.push(newUser)

    const response: LoginResponse = { accessToken: newUser.token, user: { email: newUser.email } }
    return of(new HttpResponse({ status: 200, body: response })).pipe(delay(500))
  }

  return next(req)
}
