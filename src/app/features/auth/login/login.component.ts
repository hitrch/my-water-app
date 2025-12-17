import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthStore} from '../../../core/store/auth.store';
import {HttpErrorResponse} from '@angular/common/http';
import {finalize} from 'rxjs';
import {AuthUiService} from '../../../core/services/auth-ui.service';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder)
  private authService = inject(AuthService)
  private authUiService = inject(AuthUiService)
  private dialogRef = inject<MatDialogRef<LoginComponent>>(MatDialogRef)
  private authStore = inject(AuthStore)
  isSubmitting = false

  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  submitLogin() {
    if (this.form.invalid || this.isSubmitting) return

    // clear previous server error
    this.form.setErrors(null)

    const { email, password } = this.form.value
    this.isSubmitting = true
    this.authService.login(email, password)
      .pipe(
        finalize(() => {
          this.isSubmitting = false
        })
      ).subscribe({
      next: res => {
        this.authStore.setAuth(res.accessToken, res.user)
        this.closeLoginPopup()
      },
      error: (err: HttpErrorResponse) => {
        const message = this.authUiService.mapAuthErrorToMessage(err, 'login')
        // attach a form-level error so the template can show it
        this.form.setErrors({ serverError: message })
        this.form.markAllAsTouched()
      },
    })
  }

  closeLoginPopup(): void {
    this.dialogRef.close()
  }
}
