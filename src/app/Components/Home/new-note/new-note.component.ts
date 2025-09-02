import { Component, EventEmitter, inject, Output } from '@angular/core';
import { NoteModalService } from '../../../Core/Services/noteModal/note-modal.service';

@Component({
  selector: 'app-new-note',
  imports: [],
  templateUrl: './new-note.component.html',
  styleUrl: './new-note.component.css'
})
export class NewNoteComponent {

  private readonly noteModalService = inject(NoteModalService);

  openNewNoteModal() : void{
    this.noteModalService.onOpenAddModal();
  }

}
