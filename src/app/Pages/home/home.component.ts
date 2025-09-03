import { DatePipe } from '@angular/common';
import { Note } from '../../Models/note';
import { NoteService } from './../../Core/Services/note/note.service';
import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from "../../Shared/Components/modal/modal.component";
import { AddNote } from '../../Models/add-note';
import { NoteModalService } from '../../Core/Services/noteModal/note-modal.service';

@Component({
  selector: 'app-home',
  imports: [DatePipe, ModalComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{

  private readonly noteService = inject(NoteService);
  private readonly noteModalService = inject(NoteModalService);

  userNotes : Note[] = [];

  ngOnInit(): void {
    this.getUserNotes();
  }

  getUserNotes(){
    this.noteService.getUserNotes().subscribe({
      next:(res)=>{
        console.log(res);
        if(res.msg === 'done'){
          this.userNotes = res.notes;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  handleSave(note:AddNote) :void{
    if(this.modalMode === 'add'){
      this.noteService.addNote(note).subscribe({
        next:(res)=>{
          console.log(res);
          this.getUserNotes();
        },
        error:(err)=>{
          console.log(err);
        }
      })
    } else if(this.modalMode === 'update'){
        this.noteService.updateNote(this.noteId!, note).subscribe({
          next:(res)=>{
            console.log(res);
            this.getUserNotes();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
  }

  onOpenUpdateModal(note:Note, noteId: string){
    this.noteModalService.onOpenUpdateModal(note,noteId)
  }

  deleteNote(noteId:string){
    this.noteService.deleteNote(noteId).subscribe({
      next:(res)=>{
        console.log(res);
        this.getUserNotes();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  get noteId() {
    return this.noteModalService.noteId();
  }

  get modalMode() {
    return this.noteModalService.modalMode();
  }

}
