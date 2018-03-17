import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class NameService {

  constructor(private http: HttpClient) { }

  list: string[] = ['jime', 'lily', 'lucy', 'luck'];

  getNameList() {
    return of(this.list);
  }

  getUrl() {
    return this.http.get('https://angular.io/guide/testing');
  }
}
