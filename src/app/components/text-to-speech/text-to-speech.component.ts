// src/app/components/text-to-speech/text-to-speech.component.ts
import { Component, OnInit, OnDestroy } from '@angular/core';
import { io } from 'socket.io-client';
import { DriverService } from '../../services/driver/driver.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-text-to-speech',
  templateUrl: './text-to-speech.component.html',
  styleUrls: ['./text-to-speech.component.css'],
  standalone: true,
  imports: [CommonModule],
})
export class TextToSpeechComponent implements OnInit, OnDestroy {
  private socket: any;
  drivers: any[] = [];
  audioUrl: string | null = null;

  constructor(private driverService: DriverService) {}

  ngOnInit() {
    this.socket = io('http://localhost:8080');

    // Load drivers from the backend
    this.driverService.getDrivers().subscribe((data) => {
      this.drivers = data;
    });

    // Handle the response from the backend
    this.socket.on('speechResult', (data: any) => {
      this.audioUrl = data.audioUrl;
    });

    // Handle errors
    this.socket.on('error', (error: any) => {
      console.error('Error:', error.message);
    });
  }

  convertToSpeech(driver: any) {
    this.socket.emit('textToSpeech', {
      text: driver.driver_licence,
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
