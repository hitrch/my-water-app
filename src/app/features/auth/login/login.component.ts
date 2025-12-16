import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../core/services/auth.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {AuthStore} from '../../../core/store/auth.store';

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
  private dialogRef = inject<MatDialogRef<LoginComponent>>(MatDialogRef)
  private authStore = inject(AuthStore)

  form: FormGroup = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  })

  submitLogin() {
    if (this.form.invalid) return

    const { email, password } = this.form.value
    this.authService.login(email, password).subscribe({
      next: res => {
        this.authStore.setAuth(res.accessToken, res.user)
        this.closeLoginPopup()
      },
      error: err => {
        console.error(err)
        // TODO: show error
      },
    })
  }

  closeLoginPopup(): void {
    this.dialogRef.close()
  }
}
