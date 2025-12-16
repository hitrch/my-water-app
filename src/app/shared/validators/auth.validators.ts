import {LoginRequest, RegisterRequest} from '../models/auth.model';
import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

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

export const passwordsMatchValidator = (
  passwordKey: string = 'password',
  confirmPasswordKey: string = 'confirmPassword'
): ValidatorFn => {
  return (group: AbstractControl): ValidationErrors | null => {
    const password = group.get(passwordKey)?.value
    const confirmPassword = group.get(confirmPasswordKey)?.value

    // Don't show mismatch until both fields have something
    if (!password || !confirmPassword) return null

    return password === confirmPassword ? null : { passwordMismatch: true }
  }
}
