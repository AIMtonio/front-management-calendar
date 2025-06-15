import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CustomCalendarService {

  private _URL: string = '';

  private tokenAuth: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) 
  {
    this._URL = `${environment.apiUrl}/custom-calendar`;
  }

  async crearCustomCalendar(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/new`, data, { headers: authorizationHeaders }).toPromise();
  }

  async consultarCustomCalendar(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/findByUuidUser`, data, { headers: authorizationHeaders }).toPromise();
  }

 
}
