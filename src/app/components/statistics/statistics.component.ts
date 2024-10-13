import { Component, OnInit } from '@angular/core';
import { StatisticsService } from '../../services/statistics/statistics.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatisticsComponent implements OnInit {
  statistics: any = null;
  errorMessage: string = '';

  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.loadStatistics();
  }

  loadStatistics(): void {
    this.statisticsService.getStatistics().subscribe({
      next: (data) => {
        console.log('Received Data:', data);
        this.statistics = data.stats;
      },
    });
  }
}
