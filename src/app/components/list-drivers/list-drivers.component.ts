import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriverService } from '../../services/driver/driver.service'; // 导入 DriverService

@Component({
  selector: 'app-list-drivers',
  templateUrl: './list-drivers.component.html',
  styleUrls: ['./list-drivers.component.css']
})
export class ListDriversComponent implements OnInit {

  drivers: any[] = [];

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    // 使用 DriverService 从后端获取司机数据
    this.driverService.getDrivers().subscribe(data => {
      this.drivers = data;
    });
  }
}
