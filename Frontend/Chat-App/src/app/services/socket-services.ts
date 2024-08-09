import { Injectable } from '@angular/core';
import { Socket, io } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;
  token = localStorage.getItem('token');

  constructor() {
    console.log('token', this.token);

    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        Authorization: `Bearer ${this.token}`,
      },
    });
  }

  //emit a event
  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }

  //listen to events using Obdervable
  on(eventName: string): Observable<any> {
    return new Observable((observer) => {
      this.socket.on(eventName, (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.off(eventName);
      };
    });
  }

  // disconnect the socket
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
