import { Component, OnInit } from '@angular/core';
import { io } from 'socket.io-client';
import { PackageService } from '../../services/package/package.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-translate-description',
  templateUrl: './translate-description.component.html',
  styleUrls: ['./translate-description.component.css'],
  standalone: true,
  imports: [FormsModule, CommonModule]
})
export class TranslateDescriptionComponent implements OnInit {
  private socket: any;
  packages: any[] = [];
  selectedLanguage = 'en';
  languages = ['en', 'es', 'fr'];
  translationResult = '';

  constructor(private packageService: PackageService) {}

  ngOnInit() {
    this.socket = io('http://localhost:8080');

    this.packageService.getPackages().subscribe((data) => {
      this.packages = data;
    });

    this.socket.on('translationResult', (data: any) => {
      this.translationResult = data.translatedText;
    });

    this.socket.on('error', (error: any) => {
      console.error('Error:', error.message);
    });
  }

  translateDescription(pkg: any) {
    this.socket.emit('translateDescription', {
      description: pkg.package_description, 
      language: this.selectedLanguage,
    });
  }

  ngOnDestroy() {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
