import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/32119887/Yi/api/v1';

  constructor(private http: HttpClient) {}

  signup(username: string, password: string, confirmPassword: string): Observable<any> {
    const body = { username, password, confirm_password: confirmPassword };
    return this.http.post(`${this.apiUrl}/signup`, body).pipe(
      catchError(this.handleError)
    );
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap((response: any) => {
        if (response.status === 'Login successfully') {
          sessionStorage.setItem('user', username);
        }
      }),
      catchError(this.handleError)
    );
  }


  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'unknown error';

    if (error.error instanceof ErrorEvent) {
      errorMessage = `client-side error: ${error.error.message}`;
    } else {
      errorMessage = `server-side error: ${error.status}\nmessage: ${error.message}`;
    }

    return throwError(() => new Error(errorMessage));
  }
}
