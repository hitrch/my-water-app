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
  private authUiService = inject(AuthUiService)
  private dialogRef = inject<MatDialogRef<RegisterComponent>>(MatDialogRef)
  protected readonly authStore = inject(AuthStore)

  form: FormGroup = this.fb.nonNullable.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    },
    { validators: [passwordsMatchValidator()] }
  )

  submitRegister(): void {
    if (this.form.invalid || this.authStore.isLoading()) return

    // clear previous server error
    this.form.setErrors(null)

    const { email, password } = this.form.value

    this.authStore.register(email, password)
      .subscribe({
        next: () => this.dialogRef.close(),
        error: (err: HttpErrorResponse) => {
          const message = this.authUiService.mapAuthErrorToMessage(err, 'register')
          this.form.setErrors({ serverError: message })
          this.form.markAllAsTouched()
        }
      })
  }
}
