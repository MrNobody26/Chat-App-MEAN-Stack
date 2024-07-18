import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { io } from 'socket.io-client';
import { SocketService } from 'src/app/services/socket-services';

@Component({
  selector: 'app-home-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-landing-page.component.html',
  styleUrls: ['./home-landing-page.component.scss'],
})
export class HomeLandingPageComponent {
  private socket: any;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socket.on('connect', () => {
      console.log('connected to server');
    });

    this.socket.on('recive_message', (data: any = '') => {
      console.log('recive_message', data);
    });
  }

  onClickMessageSend(data: string = '') {
    console.log('submitted');
    this.emit('mesage_sent', { message: 'hello' });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
