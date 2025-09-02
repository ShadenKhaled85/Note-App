import { Routes } from '@angular/router';
import { HomeComponent } from './Pages/home/home.component';
import { NotFoundComponent } from './Pages/not-found/not-found.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';


export const routes: Routes = [
  {path: '', redirectTo:'home', pathMatch:'full'},

  {path: 'home', component:HomeComponent, title:'Home'},
  {path: 'login', component:LoginComponent, title:'Login'},
  {path: 'register', component:RegisterComponent, title:'Register'},

  {path: '**', component:NotFoundComponent, title:'Not found!!!'},
];
