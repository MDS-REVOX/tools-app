import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MqlNotification } from '../../datas/MqlNotification';

@Component({
  selector: 'app-notification-popup',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification-popup.component.html',
  styleUrls: ['./notification-popup.component.scss']

})
export class NotificationPopupComponent {
  @Input() message: string = ''; 
  @Input() showNotification: boolean = false; 
  @Input() notification: MqlNotification | null = null;  // Réception du MqlNotification
  @Output() closePopup = new EventEmitter<void>(); 
  


  close() {
    this.closePopup.emit();
  }
}
