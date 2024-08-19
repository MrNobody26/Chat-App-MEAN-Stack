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
      to: '9898988888',
      content: 'hello first message',
      imageUrl:
        'data:image/png;base64,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',
    });
  }
}
