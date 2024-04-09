import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  email!: string;
  password!: string;


  constructor(
    private fb: FormBuilder,
    private router: Router,
  ) { }

  loginForm: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  })

  processingRequest = false;

  onSubmit() {
    this.router.navigateByUrl('/inicio');
    // this.auth.login(this.loginForm.value as LoginCredentials).
    //   then(
    //     (success) => {
    //       if (success) { } else {
    //         this.openDialogWithTemplate(this.cardError);
    //       }
    //     }
    //   )
  }

}
