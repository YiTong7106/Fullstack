import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { Driver } from '../../models/driver';
import { DriverService } from '../../services/driver/driver.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-driver',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-driver.component.html',
  styleUrl: './add-driver.component.css'
})
export class AddDriverComponent {

  driver: Driver = new Driver('', 'Food', '');

  constructor(private db: DriverService, private router:Router) { }

  addDriver() {

    this.db.addDriver(this.driver).subscribe((data: any) => {
      this.router.navigate(['list-drivers']);
    });

  }

}
