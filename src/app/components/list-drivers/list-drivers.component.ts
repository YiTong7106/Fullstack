// list-drivers.component.ts
import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver/driver.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UppercasePipe } from '../../pipes/uppercase.pipe';

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css'],
  standalone: true,
  imports: [CommonModule, UppercasePipe]
})
export class ListDriversComponent implements OnInit {

  drivers: any[] = [];
  selectedDriverPackages: any[] = [];
  selectedDriverId: string | null = null;

  constructor(
    private driverService: DriverService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadDrivers();
  }

  loadDrivers(): void {
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
    });
  }

  deleteDriver(id: string): void {
    if (confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(id).subscribe({
        next: () => (alert('Driver deleted successfully!'), this.loadDrivers()),
        error: (error) => alert('Error deleting driver: ' + error)
      });
    }
  }

  togglePackages(driverId: string): void {
    if (this.selectedDriverId === driverId) {
      this.selectedDriverPackages = [];
      this.selectedDriverId = null;
    } else {
      const selectedDriver = this.drivers.find(driver => driver._id === driverId);
      if (selectedDriver && selectedDriver.assigned_packages) {
        this.selectedDriverPackages = selectedDriver.assigned_packages;
        this.selectedDriverId = driverId;
      } else {
        this.selectedDriverPackages = [];
      }
    }
  }
}
