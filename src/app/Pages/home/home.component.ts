import { DatePipe } from '@angular/common';
import { Note } from '../../Models/note';
import { NoteService } from './../../Core/Services/note/note.service';
import { Component, inject, OnInit } from '@angular/core';
import { ModalComponent } from "../../Shared/Components/modal/modal.component";
import { AddNote } from '../../Models/add-note';
import { NoteModalService } from '../../Core/Services/noteModal/note-modal.service';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-home',
  imports: [DatePipe, ModalComponent, ConfirmDialog, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  providers: [ConfirmationService, MessageService]
})
export class HomeComponent implements OnInit{

  constructor(private confirmationService: ConfirmationService, private messageService: MessageService) {}

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
          this.noteService.updateNotesCount(this.userNotes.length);
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
          next:()=>{
            this.getUserNotes();
          },
          error:(err)=>{
            console.log(err);
          }
        })
      }
    this.noteModalService.closeModal();
  }

  onOpenUpdateModal(note:Note, noteId: string){
    this.noteModalService.onOpenUpdateModal(note,noteId)
  }

  get noteId() {
    return this.noteModalService.noteId();
  }

  get modalMode() {
    return this.noteModalService.modalMode();
  }

  deleteNote(noteId:string){
    this.noteService.deleteNote(noteId).subscribe({
      next:()=>{
        this.getUserNotes();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  // ? Confirm Deletion
  confirm1(event: Event, noteId:string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Are you sure you want to delete this note?',
      header: 'Delete Note',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
      label: 'Cancel',
      severity: 'secondary',
      outlined: true,
      },
      acceptButtonProps: {
        label: 'Delete',
        severity: 'danger'
        },
        accept: () => {
            this.deleteNote(noteId);
            this.messageService.add({
            severity: 'success',
            summary: 'Note deleted successfully',
            });
        },
        reject: () => {
          this.messageService.add({
          severity: 'info',
          summary: 'Rejected',
          life: 3000,
          });
        },
      });
    }

}
