import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';

export function passMatchValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const pass = control.get('password')?.value;
    const confPass = control.get('confPassword')?.value;

    if (pass && confPass && pass !== confPass){
      return {
        passwordsDontMatch: true
      }
    }

    return null;

  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{

  signForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.email]),
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', Validators.required)
  }, { validators:passMatchValidator() });

  ngOnInit(): void {
    
  }

  constructor(
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router
  ){ }


  get email() {
    return this.signForm.get('email');
  }

  get password() {
    return this.signForm.get('password');
  }

  get confPassword() {
    return this.signForm.get('confPassword')
  }

  submit(){
    const {email , password} = this.signForm.value;

    if(!this.signForm.valid || !email || !password) { 
      return ; 
    }
    
    this.authService.SignUp(email, password);
  }

}
