import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private apiUrl = 'http://localhost:8080/32119887/Yi/api/v1/drivers';

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  addDriver(driver: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, driver);
  }

  deleteDriver(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateDriver(id: string, driver: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, driver);
  }
}
