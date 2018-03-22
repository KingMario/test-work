import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable()
export class NameService {

  constructor(private httpClient: HttpClient, private http: Http) { }

  list: string[] = ['jime', 'lily', 'lucy', 'luck'];

  getNameList() {
    return of(this.list);
  }

  getData() {
    return this.httpClient.get('https://angular.io/guide/testing');
  }

  getDataByHttp() {
    return this.http.get('https://angular.io/guide/testing');
  }
}
