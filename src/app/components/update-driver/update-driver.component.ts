import { Component, OnInit } from '@angular/core';
import { DriverService } from '../../services/driver/driver.service';
import { Driver } from '../../models/driver';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-update-driver',
  templateUrl: './update-driver.component.html',
  styleUrls: ['./update-driver.component.css'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class UpdateDriverComponent implements OnInit {
  
  drivers: Driver[] = [];
  selectedDriverId: string = '';
  driver: Driver = new Driver('', 'Food', ''); 

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute,
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


  loadDriverDetails(): void {
    const selectedDriver = this.drivers.find(driver => driver._id === this.selectedDriverId);
    if (selectedDriver) {
      this.driver = { ...selectedDriver }; 
    }
  }

  updateDriver(): void {
    console.log('Updating driver:', this.driver);
    if (this.driver && this.driver._id) {
      this.driverService.updateDriver(this.driver._id, this.driver).subscribe(() => {
        this.router.navigate(['/list-drivers']);
      });
    }
  }
}
