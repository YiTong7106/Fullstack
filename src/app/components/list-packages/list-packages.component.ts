import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package/package.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KgToGramsPipe } from '../../pipes/kg-to-grams.pipe';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'],
  standalone: true,
  imports: [CommonModule, KgToGramsPipe]
})
export class ListPackagesComponent implements OnInit {

  packages: any[] = [];
  errorMessage: string = '';

  constructor(private packageService: PackageService, private router: Router) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe({
      next: (data) => {
        this.packages = data;
      }
    });
  }

  deletePackage(id: string): void {
    if (confirm('Are you sure you want to delete this package?')) {
      this.packageService.deletePackage(id).subscribe({
        next: () => {
          this.loadPackages();
        }
      });
    }
  }
}
