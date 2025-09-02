import { Injectable, signal } from '@angular/core';
import { AddNote } from '../../../Models/add-note';
import { Note } from '../../../Models/note';

@Injectable({
  providedIn: 'root'
})
export class NoteModalService {

  constructor() { }

  visible = signal<boolean>(false);
  modalMode = signal<'add' | 'update'>('add');
  selectedNote = signal<AddNote>({title:'', content:''});
  noteId = signal<string | null>(null);

  onOpenAddModal(): void{
    this.selectedNote.set({title:'', content:''});
    this.modalMode.set('add');
    this.visible.set(true);
    this.noteId.set(null);
  }

  onOpenUpdateModal(selectedNote: Note, noteId: string): void{
    this.selectedNote.set({title: selectedNote.title, content: selectedNote.content});
    this.modalMode.set('update');
    this.visible.set(true);
    this.noteId.set(noteId);
  }

  closeModal(){
    this.visible.set(false);
  }
}
