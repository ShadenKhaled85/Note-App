import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { authGuard } from './Core/Guards/auth/auth.guard';
import { loggedGuard } from './Core/Guards/logged/logged.guard';


export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},

  {path: 'home', canActivate:[authGuard], component:HomeComponent, title:'Home'},
  {path: 'login', canActivate:[loggedGuard], component:LoginComponent, title:'Login'},
  {path: 'register', canActivate:[loggedGuard], component:RegisterComponent, title:'Register'},

  {path: '**', component:NotFoundComponent, title:'Not found!!!'},
];
