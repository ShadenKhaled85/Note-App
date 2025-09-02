import { TestBed } from '@angular/core/testing';

import { NoteModalService } from './note-modal.service';

describe('NoteModalService', () => {
  let service: NoteModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NoteModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
