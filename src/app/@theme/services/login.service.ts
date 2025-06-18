import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private _URL: string = '';
  private tokenAuth: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) 
  {
    this._URL = `${environment.apiUrl}/usuario`;
  }

  login(data: any): Observable<any> {
      let authorizationHeaders = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        //'Authorization': `Bearer ${tokenAuth}`,
      });

      return this.http.post(`${this._URL}/login`, data, { headers: authorizationHeaders });
  }

  async findUserByEmail(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/validateUserByCustomCalendar`, data, { headers: authorizationHeaders }).toPromise();
  }

 
}
