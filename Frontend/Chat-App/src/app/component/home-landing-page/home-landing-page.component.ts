import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from 'src/app/services/socket-services';

@Component({
  selector: 'app-home-landing-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-landing-page.component.html',
  styleUrls: ['./home-landing-page.component.scss'],
})
export class HomeLandingPageComponent {
  data: any;
  constructor(private socketService: SocketService) {}

  ngOnInit() {
    this.socketService.on('private_message').subscribe((data: any) => {
      console.log('Data', data);
    });
  }

  onClickMessageSend(data: string = '') {
    console.log('submitted', data);
    this.socketService.emit('private_message', {
      to: data,
      content: 'hello first message',
    });
  }
}
