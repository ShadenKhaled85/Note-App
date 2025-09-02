import { UserService } from './../../Core/Services/user/user.service';
import { Component, computed, inject, input, Input, InputSignal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  private readonly userService = inject(UserService);
  private readonly router = inject(Router);

  isLoggedIn = computed(()=> this.userService.isLoggedIn())

  isSidebarOpen : boolean = false;

  ngOnInit(): void {
    initFlowbite();
    if(localStorage.getItem('token')){
      this.userService.loggedIn();
    }
  }

  openSidebar(){
    this.isSidebarOpen = true;
  }

  closeSidebar(){
    this.isSidebarOpen = false;
  }

  signOut(){
    this.userService.loggedOut();
    localStorage.removeItem('token')
    this.router.navigate(['/login'])
  }
}
