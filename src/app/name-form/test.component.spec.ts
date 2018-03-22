import { TestComponent } from './test.component';
import { By } from '@angular/platform-browser';

import { NameFormComponent } from './name-form.component';
import { async, inject, fakeAsync, discardPeriodicTasks, tick, flush, TestBed, ComponentFixture } from '@angular/core/testing';
import { NameService } from '../name.service';
import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub } from '../shared/route-stub';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('test TestComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  const route = new ActivatedRouteStub({name: 'jime'});
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        NameFormComponent
      ],
      providers: [
        NameService,
        { provide: ActivatedRoute, useValue: route },
      ],
      imports: [
        HttpClientModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  }));

  it('should test routed', async(() => {
    fixture.whenStable().then(() => {
      expect(component.name).toBe('jime');
    });
  }));

  it('should test fakeAsync', fakeAsync(function() {
    const nameService = TestBed.get(NameService);
    spyOn(component, 'clickBtn').and.callThrough();
    spyOn(nameService, 'getNameList').and.callThrough();
    // this.hostComponent.delayTime = 0;
    component.clickBtn(); // task and microtask
    expect(component.firstName).toBeUndefined();
    tick(1000);
    expect(nameService.getNameList).toHaveBeenCalled();
    expect(component.firstName).toBe('jime');
    discardPeriodicTasks();
  }));

  it('should test done', function(done) {
    component.clickBtn();
    setTimeout(() => {
      expect(component.firstName).toBe('jime');
      done();
    }, 0);
  });

  it('should test async', async(function() {
    const service = TestBed.get(NameService);
    spyOn(service, 'getNameList').and.callThrough();
    component.clickBtn();
    // component.delayTime = 0;

    fixture.whenStable().then(() => {
      // expect(service.getNameList()).toHaveBeenCalled(); // error, whenStable is not flush task, only work to microtask
      expect(component.firstName).toBe('jime');
    });
  }));

  it('should test child component', fakeAsync(() => {
    fixture.detectChanges();
    const nameFormDebugEle = fixture.debugElement.query(By.directive(NameFormComponent));
    const nameFormComponent = nameFormDebugEle.injector.get(NameFormComponent);
    expect(component.name).toBe('jime');
    expect(nameFormComponent.name).toBe('jime');
    const input: any = nameFormDebugEle.query(By.css('input')).nativeElement;
    input.value = 'jime1';
    input.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(component.name).toBe('jime1');
    expect(nameFormComponent.name).toBe('jime1');
  }));

  it('should test service', fakeAsync(() => {
    const nameService: NameService = TestBed.get(NameService);
    // const nameService = fixture.debugElement.injector.get(NameService);
    nameService.getNameList().subscribe((data) => {
      console.log('test service');
      expect(data.length).toBe(4);
    });
  }));

  it('should test service by inject', inject([NameService], (nameService: NameService) => {
    nameService.getNameList().subscribe((data) => {
      console.log('test service');
      expect(data.length).toBe(4);
    });
  }));
});
