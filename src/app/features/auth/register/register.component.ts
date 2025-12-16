import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../../core/services/auth.service'
import { Router } from '@angular/router'
import {AuthStore} from '../../../core/store/auth.store';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private dialogRef = inject<MatDialogRef<RegisterComponent>>(MatDialogRef)
  private authStore = inject(AuthStore)

  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  })

  submitRegister(): void {
    if (this.form.invalid) return
    const { email, password, confirmPassword } = this.form.value
    if (password !== confirmPassword) return console.error('Passwords do not match')

    this.authService.register(email, password).subscribe({
      next: () => {
        // Auto-login after successful registration
        this.authService.login(email, password).subscribe({
          next: res => {
            this.authStore.setAuth(res.accessToken, res.user)
            this.dialogRef.close()
          },
          error: err => console.error('Login after registration failed', err)
        })
      },
      error: err => console.error(err)
    })
  }
}
