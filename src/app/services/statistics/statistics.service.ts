import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private apiUrl = 'http://localhost:8080/32119887/Yi/api/v1/stats';

  constructor(private http: HttpClient) { }

  getStatistics(): Observable<any> {
    return this.http.get<any>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server-side error: ${error.status} ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
