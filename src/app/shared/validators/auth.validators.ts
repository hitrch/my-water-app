import {LoginRequest, RegisterRequest} from '../models/auth.model';

export function isLoginRequest(obj: any): obj is LoginRequest {
  return (
    obj &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string'
  )
}

export function isRegisterRequest(obj: any): obj is RegisterRequest {
  return (
    obj &&
    typeof obj.email === 'string' &&
    typeof obj.password === 'string'
  )
}
