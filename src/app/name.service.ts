import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NameService {

  list: string[] = ['jime', 'lily', 'lucy', 'luck'];

  getNameList() {
    return of(this.list);
  }
}
