import { Injectable, inject } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { LoginResponse } from '../../shared/models/auth.model'

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient)

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/login', { email, password })
  }

  register(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>('/auth/register', { email, password })
  }
}

