import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Package } from '../../models/package';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private apiUrl = 'http://localhost:8080/32119887/Yi/api/v1/packages';

  constructor(private http: HttpClient, private router: Router) { }

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  getPackageById(id: string): Observable<Package> {
    return this.http.get<Package>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addPackage(pkg: Package): Observable<Package> {
    return this.http.post<Package>(`${this.apiUrl}/add`, pkg).pipe(
      catchError(this.handleError)
    );
  }

  deletePackage(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  updatePackage(id: string, pkg: Package): Observable<Package> {
    return this.http.put<Package>(`${this.apiUrl}/${id}`, pkg).pipe(
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
