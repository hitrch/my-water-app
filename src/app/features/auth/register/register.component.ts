import { Component, inject } from '@angular/core'
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { AuthService } from '../../../core/services/auth.service'
import {AuthStore} from '../../../core/store/auth.store';
import {passwordsMatchValidator} from '../../../shared/validators/auth.validators';
import {HttpErrorResponse} from '@angular/common/http';
import {catchError, EMPTY, finalize, switchMap, tap} from 'rxjs';
import {AuthUiService} from '../../../core/services/auth-ui.service';

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
  private authUiService = inject(AuthUiService)
  private dialogRef = inject<MatDialogRef<RegisterComponent>>(MatDialogRef)
  private authStore = inject(AuthStore)
  isSubmitting = false

  form: FormGroup = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    { validators: [passwordsMatchValidator()] }
  )

  submitRegister(): void {
    if (this.form.invalid || this.isSubmitting) return

    // clear previous server error
    this.form.setErrors(null)

    this.isSubmitting = true
    const { email, password } = this.form.value

    this.authService.register(email, password)
      .pipe(
        // after successful registration -> auto login
        switchMap(() => this.authService.login(email, password)),
        tap(res => {
          this.authStore.setAuth(res.accessToken, res.user)
          this.dialogRef.close()
        }),
        catchError((err: HttpErrorResponse) => {
          const message = this.authUiService.mapAuthErrorToMessage(err, 'register')
          this.form.setErrors({ serverError: message })
          this.form.markAllAsTouched()
          return EMPTY
        }),
        finalize(() => {
          this.isSubmitting = false
        })
      )
      .subscribe()
  }
}
