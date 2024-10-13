// src/app/services/socket/socket.service.ts
import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {}

  // 1. Translate Description
  translateDescription(description: string, language: string): Observable<any> {
    this.socket.emit('translate-description', { description, language });
    return this.socket.fromEvent('translation-result');
  }

  // 2. Text-to-Speech
  convertTextToSpeech(text: string): Observable<any> {
    this.socket.emit('text-to-speech', { text });
    return this.socket.fromEvent('speech-result');
  }

  // 3. Generative AI: Calculate Distance
  calculateDistance(destination: string): Observable<any> {
    this.socket.emit('calculate-distance', { destination });
    return this.socket.fromEvent('distance-result');
  }

  // Handle Errors
  handleError(): Observable<any> {
    return this.socket.fromEvent('error');
  }
}
