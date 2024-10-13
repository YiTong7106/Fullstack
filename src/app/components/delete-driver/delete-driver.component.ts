import { Component } from '@angular/core';
import { DriverService } from '../../services/driver/driver.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-delete-driver',
  templateUrl: './delete-driver.component.html',
  styleUrls: ['./delete-driver.component.css']
})
export class DeleteDriverComponent {

  constructor(
    private driverService: DriverService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  deleteDriver(): void {
    const driverId = this.route.snapshot.paramMap.get('id');
    if (driverId && confirm('Are you sure you want to delete this driver?')) {
      this.driverService.deleteDriver(driverId).subscribe(() => {
        this.router.navigate(['/list-drivers']);
      });
    }
  }
}
