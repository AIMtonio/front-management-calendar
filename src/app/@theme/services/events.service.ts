import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class EventoService {

  private _URL: string = '';

  private tokenAuth: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) 
  {
    this._URL = `${environment.apiUrl}/evento`;
  }

  login(data: any): Observable<any> {
      let authorizationHeaders = new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        //'Authorization': `Bearer ${tokenAuth}`,
      });

      return this.http.post(`${this._URL}/login`, data, { headers: authorizationHeaders });
  }

  async crearEvento(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/new`, data, { headers: authorizationHeaders }).toPromise();
  }

  async consultarEventos(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/findMyEvents`, data, { headers: authorizationHeaders }).toPromise();
  }

 
}
