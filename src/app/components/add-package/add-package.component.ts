import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PackageService } from '../../services/package/package.service';
import { DriverService } from '../../services/driver/driver.service';
import { Package } from '../../models/package';
import { Driver } from '../../models/driver';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-add-package',
  templateUrl: './add-package.component.html',
  styleUrls: ['./add-package.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule]
})
export class AddPackageComponent implements OnInit {

  package: Package = {
    package_id: '',
    package_title: '',
    package_weight: 0,
    package_destination: '',
    package_description: '',
    driver_id: '',
    isAllocated: false
  };

  drivers: Driver[] = [];
  errorMessage: string = '';
  constructor(
    private packageService: PackageService,
    private driverService: DriverService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe(drivers => {
      this.drivers = drivers;
    });
  }

  addPackage(): void {
    this.packageService.addPackage(this.package).subscribe({
      next: () => {
        this.router.navigate(['/list-packages']);
      }
    });
  }
  
}
