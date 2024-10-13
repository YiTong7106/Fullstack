import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Driver } from '../../models/driver';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'http://localhost:8080/32119887/Yi/api/v1/drivers';

  constructor(private http: HttpClient, private router: Router) { }

  getDrivers(): Observable<Driver[]> {
    return this.http.get<Driver[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  addDriver(driver: Driver): Observable<Driver> {
    return this.http.post<Driver>(`${this.apiUrl}/add`, driver).pipe(
      catchError(this.handleError)
    );
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updateDriver(id: string, driver: Driver): Observable<Driver> {
    return this.http.put<Driver>(`${this.apiUrl}/${id}`, driver).pipe(
      catchError(this.handleError)
    );
  }

  private handleError = (error: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid data provided.';
          this.router.navigate(['/invalid-data']);
          break;
        case 404:
          errorMessage = 'Resource not found.';
          break;
        case 500:
          errorMessage = 'Internal Server Error. Please try again later.';
          break;
        default:
          errorMessage = `Server-side error: ${error.status}\nMessage: ${error.message}`;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
