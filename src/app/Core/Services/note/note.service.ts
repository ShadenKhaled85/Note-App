import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../Environment/environment';
import { AddNote } from '../../../Models/add-note';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient : HttpClient) { }

  getUserNotes(): Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/notes`)
  }

  addNote(noteData:AddNote): Observable<AddNote>{
    return this.httpClient.post<AddNote>(`${environment.baseUrl}/api/v1/notes`, noteData)
  }

  updateNote(noteId:string, noteData:AddNote): Observable<AddNote>{
    return this.httpClient.put<AddNote>(`${environment.baseUrl}/api/v1/notes/${noteId}`, noteData)
  }

  deleteNote(noteId:string): Observable<AddNote>{
    return this.httpClient.delete<AddNote>(`${environment.baseUrl}/api/v1/notes/${noteId}`)
  }
}
