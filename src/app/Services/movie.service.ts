import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie } from '../Interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private endpoint: string = environment.endPoint;
  private apirUrl: string = this.endpoint;

  constructor(private http: HttpClient) { }

  getList(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apirUrl}movie/list`);
  }

  add(modelo: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.apirUrl}movie/save`, modelo);
  }

  update(idMovie: number, modelo: Movie): Observable<Movie> {
    return this.http.put<Movie>(`${this.apirUrl}movie/update/${idMovie}`, modelo).pipe(
      catchError((error: any) => {
        console.error('Error updating movie:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  delete(idMovie: number): Observable<void> {
    return this.http.delete<void>(`${this.apirUrl}movie/delete/${idMovie}`);
  }
}
