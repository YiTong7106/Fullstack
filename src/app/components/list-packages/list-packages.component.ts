// list-packages.component.ts
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package/package.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-packages',
  templateUrl: './list-packages.component.html',
  styleUrls: ['./list-packages.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ListPackagesComponent implements OnInit {

  packages: any[] = [];
  selectedPackageDriver: any = null;
  selectedPackageId: string | null = null;

  constructor(
    private packageService: PackageService,
  ) { }

  ngOnInit(): void {
    this.loadPackages();
  }

  loadPackages(): void {
    this.packageService.getPackages().subscribe(data => {
      this.packages = data;
    });
  }

  toggleDriver(packageId: string): void {
    if (this.selectedPackageId === packageId) {
      this.selectedPackageDriver = null;
      this.selectedPackageId = null;
    } else {
      const selectedPackage = this.packages.find(pkg => pkg._id === packageId);
      if (selectedPackage && selectedPackage.driver_id) {
        this.selectedPackageDriver = selectedPackage.driver_id;
        this.selectedPackageId = packageId;
      } else {
        this.selectedPackageDriver = null;
      }
    }
  }
}
