import { Component, OnInit } from '@angular/core';
import { StatsService } from '../../services/stats/stats.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class StatsComponent implements OnInit {
  stats: any = null;
  errorMessage: string = '';

  constructor(private statsService: StatsService) { }

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.statsService.getStats().subscribe({
      next: (data) => {
        this.stats = data.stats;
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message}`;
      }
    });
  }
}
