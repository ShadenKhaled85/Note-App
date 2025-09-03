import { UserService } from './../../Core/Services/user/user.service';
import { Component, computed, inject, input, Input, InputSignal, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { NewNoteComponent } from "../../Components/Home/new-note/new-note.component";
import { NoteService } from '../../Core/Services/note/note.service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, NewNoteComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  private readonly userService = inject(UserService);
  private readonly noteService = inject(NoteService);
  private readonly router = inject(Router);

  notesCount : number = 0;

  isLoggedIn = computed(()=> this.userService.isLoggedIn())

  isSidebarOpen : boolean = false;

  ngOnInit(): void {
    initFlowbite();
    if(localStorage.getItem('token')){
      this.userService.loggedIn();
      this.noteService.notesCount.subscribe(count => {
        this.notesCount = count;
    });
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
