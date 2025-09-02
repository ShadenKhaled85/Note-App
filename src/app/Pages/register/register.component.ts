import { UserService } from './../../Core/Services/user/user.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms'
import { FloatLabelModule } from "primeng/floatlabel"
import { InputTextModule } from 'primeng/inputtext';
import { Router } from '@angular/router';
import { AlertMessagesComponent } from "../../Shared/Components/alert-messages/alert-messages.component";
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, FloatLabelModule, InputTextModule,Toast, AlertMessagesComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  providers: [MessageService],
})
export class RegisterComponent implements OnInit{

  private readonly formBuilder = inject(FormBuilder);
  private readonly userService = inject(UserService);
  private readonly messageService = inject(MessageService);
  private readonly router = inject(Router);

  isLoading : boolean = false;

  registerForm : FormGroup = this.formBuilder.group({
    name : [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    email : [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
    password : [null, [Validators.required, Validators.pattern(/^[A-Z]\w{6,}$/)]],
    age : [null, [Validators.required, Validators.pattern(/^(1[0-9]|[2-7][0-9]|80)$/)]],
    phone : [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  })

  ngOnInit(): void {

  }

  submitRegisterForm(){
    if(this.registerForm.valid){
      this.isLoading = true;
      this.userService.signUp(this.registerForm.value).subscribe({
      next:(res)=>{
        this.isLoading = false;
        console.log(res);
        if(res.msg === 'done'){
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
          this.messageService.add({
            severity: 'success',
            summary: 'Account created successfully',
          });
          this.registerForm.reset();
        }
      },
      error:(err)=>{
        this.isLoading = false;
        console.log(err);
        this.messageService.add({
            severity: 'error',
            summary: 'Registeration failed',
            detail: err.error.msg || 'Something went wrong. Please try again.'
          });
      }
      })
    }
    else{
      this.registerForm.markAllAsTouched()
    }
  }
}
