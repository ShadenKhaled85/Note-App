import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginUserData, IUser } from '../../../Models/iuser';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient : HttpClient) { }

  isLoggedIn = signal<boolean>(false);

  signUp(registerData:IUser): Observable<any>{
    return this.httpClient.post
    (`${environment.baseUrl}/api/v1/users/signUp`,
      registerData
    );
  }

  signIn(loginData:ILoginUserData): Observable<any>{
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/users/signIn`,
      loginData
    );
  }

  loggedIn():void{
    this.isLoggedIn.set(true);
  }

  loggedOut():void{
    this.isLoggedIn.set(false);
  }
}
