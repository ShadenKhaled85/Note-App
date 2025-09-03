import { Component, effect, EventEmitter, inject, Output } from '@angular/core';
import { NoteModalService } from '../../../Core/Services/noteModal/note-modal.service';
import { AddNote } from '../../../Models/add-note';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from "primeng/floatlabel"
import { AlertMessagesComponent } from "../alert-messages/alert-messages.component";

@Component({
  selector: 'app-modal',
  imports: [ReactiveFormsModule, Dialog, InputTextModule, ButtonModule, FloatLabelModule, AlertMessagesComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {

  constructor(){
    effect(()=>{
      const selected = this.noteModalService.selectedNote()
      this.noteForm.patchValue(selected);
    })
  }

  private readonly noteModalService = inject(NoteModalService);
  private readonly formBuilder = inject(FormBuilder);

  @Output() addNote = new EventEmitter<AddNote>();

  noteForm : FormGroup = this.formBuilder.group({
    title: [null, [Validators.required]],
    content: [null, [Validators.required]],
  })

  submitAddNote(){
    if(this.noteForm.valid){
      this.addNote.emit(this.noteForm.value);
      this.noteForm.reset();
    }
    else{
      this.noteForm.markAllAsTouched();
    }
  }

  get visible() {
    return this.noteModalService.visible();
  }

  get modalMode() {
    return this.noteModalService.modalMode();
  }

  closeModal(){
    this.noteModalService.closeModal()
  }

}
