import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
import { By } from '@angular/platform-browser';
import 'rxjs/add/observable/timer';

import { NameFormComponent } from './name-form.component';
import { async, inject, fakeAsync, discardPeriodicTasks, tick, flush, TestBed, ComponentFixture } from '@angular/core/testing';
import { NameService } from '../name.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  template: `
    <app-name-form [(name)]="name"></app-name-form>
    <div *ngFor="let name1 of nameList | async">{{name1}}</div>
  `
})
export class TestComponent {
  name: string;
  nameList: Observable<string[]>;
  delayTime = 1000;
  firstName: string;

  constructor(private nameService: NameService, route: ActivatedRoute) {
    route.paramMap.subscribe((data) => {
      this.name = data.get('name');
    });
  }
  clickBtn() {
    setInterval(() => {
      this.nameList = this.nameService.getNameList();
    }, this.delayTime);
    // setTimeout(() => { this.firstName = "jime"; }, 0);
    Promise.resolve('jime').then((data) => {
      this.firstName = data;
    });
  }
}
