import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Message } from 'primeng/message';

@Component({
  selector: 'app-alert-messages',
  imports: [Message],
  templateUrl: './alert-messages.component.html',
  styleUrl: './alert-messages.component.css'
})
export class AlertMessagesComponent {

  @Input({required:true}) control !: AbstractControl | null;
  @Input() fieldName : string = '';
}
