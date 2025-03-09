

import { Component, inject, Input } from '@angular/core';
import { FormGroup, FormControl, NgModel, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Authentication/service/authentication.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { _MatInternalFormField } from '@angular/material/core';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  imports: [
    MatDialogModule,
    FormsModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule
  ],
  styleUrls: ['./login-modal.component.css']
})
export class LoginModalComponent {
  @Input() isVisible = false;
private dailog=inject(MatDialog)
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  credentials = { email: '', password: '' };
  router = inject(Router);
  // dialogRef: any;
  constructor(private auhenticationService: AuthenticationService) { }
  onSubmit() {
    this.loginForm.value?.email ? this.credentials.email = this.loginForm.value.email : "";
    this.loginForm.value?.password ? this.credentials.password = this.loginForm.value.password : "";
    this.auhenticationService.login(this.credentials).subscribe(res => {
      console.log(res)
      this.auhenticationService.isTeacher = res.role == "teacher" ? true : false;
      sessionStorage.setItem("token", res.token);
      localStorage.setItem("id", res.userId);
      this.auhenticationService.isLoggedIn = true;
      this.router.navigate(['courses']);
    }, error => {
      console.log(error);
    }
    );
  }

  closeModal(): void {
    // this.dailog.close();
  }
}


