// src/app/components/generative-ai/generative-ai.component.ts
import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { PackageService } from '../../services/package/package.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generative-ai',
  templateUrl: './generative-ai.component.html',
  styleUrls: ['./generative-ai.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class GenerativeAIComponent implements OnInit {
  private socket: any;
  packages: any[] = [];
  distanceResult = '';
  selectedPackage: any;

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.socket = io('http://localhost:8080');

    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
    });

    this.socket.on('distanceResult', (data: any) => {
      this.distanceResult = `Distance: ${data.distance}`;
    });

    this.socket.on('error', (error: any) => {
      console.error('Error:', error.message);
    });
  }

  calculateDistance(pkg: any) {
    this.socket.emit('calculateDistance', {
      destination: pkg.package_destination
    });
    this.selectedPackage = pkg;
    this.distanceResult = 'Calculating...';
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
