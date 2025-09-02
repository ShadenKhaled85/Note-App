import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from "./Layouts/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'NoteApp';

  ngOnInit(): void {
    initFlowbite();
  }
}
