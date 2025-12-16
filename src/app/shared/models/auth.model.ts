export interface User {
  email: string
}

export interface AuthUser extends User {
  password: string
  token: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  user: User
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
}

