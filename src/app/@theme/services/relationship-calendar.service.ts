import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class RelationshipCalendar {

  private _URL: string = '';

  private tokenAuth: string = localStorage.getItem('token') || '';

  constructor(private http: HttpClient) 
  {
    this._URL = `${environment.apiUrl}/relationship-calendar`;
  }

  async new(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/new`, data, { headers: authorizationHeaders }).toPromise();
  }

  async consultarRelationshipCalendar(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/findRelationshipByCalendar`, data, { headers: authorizationHeaders }).toPromise();
  }

  async consultarInfoClientesByCalendar(data: any){
    let authorizationHeaders = new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${this.tokenAuth}`,
    });
    return this.http.post(`${this._URL}/findRelationshipByUser`, data, { headers: authorizationHeaders }).toPromise();
  }
 
}
