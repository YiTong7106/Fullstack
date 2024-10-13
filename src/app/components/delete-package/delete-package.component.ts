// delete-packages.component.ts
import { Component, OnInit } from '@angular/core';
import { PackageService } from '../../services/package/package.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-package',
  templateUrl: './delete-package.component.html',
  styleUrls: ['./delete-package.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class DeletePackagesComponent implements OnInit {

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
