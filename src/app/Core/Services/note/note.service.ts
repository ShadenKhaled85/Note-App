import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INote } from '../../../Models/inote';
import { environment } from '../../Environment/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private httpClient : HttpClient) { }

  getUserNotes(): Observable<any>{
    return this.httpClient.get(`${environment.baseUrl}/api/v1/notes`)
  }

  addNote(noteData:INote): Observable<INote>{
    return this.httpClient.post<INote>(`${environment.baseUrl}/api/v1/notes`, noteData)
  }

  updateNote(noteId:string, noteData:INote): Observable<INote>{
    return this.httpClient.put<INote>(`${environment.baseUrl}/api/v1/notes/${noteId}`, noteData)
  }

  deleteNote(noteId:string): Observable<INote>{
    return this.httpClient.delete<INote>(`${environment.baseUrl}/api/v1/notes/${noteId}`)
  }
}
