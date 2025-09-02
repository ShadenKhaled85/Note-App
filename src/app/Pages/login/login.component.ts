import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../Core/Services/user/user.service';
import { Router } from '@angular/router';
import { FloatLabel } from "primeng/floatlabel";
import { AlertMessagesComponent } from "../../Shared/Components/alert-messages/alert-messages.component";
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FloatLabel, AlertMessagesComponent,Toast],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers: [MessageService],
})
export class LoginComponent {

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly router = inject(Router);
  private readonly messageService = inject(MessageService);

  isLoading : boolean = false;

  loginForm : FormGroup = this.formBuilder.group({
    email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)]]
  })

  submitLoginForm(){
    if(this.loginForm.valid){
      this.isLoading = true;
      this.userService.signIn(this.loginForm.value).subscribe({
        next:(res)=>{
          this.isLoading = false;
          console.log(res);
          if(res.msg === 'done'){
            setTimeout(() => {
              this.router.navigate(['/home']);
            }, 1000);
            this.messageService.add({
              severity: 'success',
              summary: 'Logged in successfully',
            })
            localStorage.setItem('token', `3b8ny__${res.token}`);
            this.userService.loggedIn();
            this.loginForm.reset();
          }
        },
        error:(err)=>{
          this.isLoading = false;
          console.log(err);
          this.messageService.add({
            severity: 'error',
            summary: 'Login failed',
            detail: err.error.msg || 'Something went wrong. Please try again. '
          })
        }
      })
    }
    else{
      this.loginForm.markAllAsTouched();
    }
  }
}
