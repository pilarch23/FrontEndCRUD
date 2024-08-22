import { Injectable } from '@angular/core';

import{HttpClient}from'@angular/common/http';
import{environment}from'src/environments/environment';
import{Observable}from'rxjs';
import{Director}from'../Interfaces/director';
import { Dir } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class DirectorService {

  private endpoint:string = environment.endPoint;
  private apirUrl:string = this.endpoint+ "director/";

  constructor(private http:HttpClient) { }

  getList():Observable<Director[]>{
    return this.http.get<Director[]>(`${this.apirUrl}list`);
  }

  add(modelo:Director):Observable<Director>{
    return this.http.post<Director>(`${this.apirUrl}save`,modelo);
  }

  update(idDirector:number, modelo:Director):Observable<Director>{
    return this.http.put<Director>(`${this.apirUrl}update/${idDirector}`,modelo);
  }

  delete(idDirector:number):Observable<void>{
    return this.http.delete<void>(`${this.apirUrl}delete/${idDirector}`);
  }
}
