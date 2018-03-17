import { TestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AppModule } from './app.module';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [
        { provide: Router,      useValue: routerSpy }
      ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should test routing', fakeAsync(() => {
    tick();
    const router = TestBed.get(Router);
    // spyOn(router, 'navigate').and.callFake((args) => {
    //   expect(args[0]).toBe('/test');
    //   expect(args[1]['name']).toBe('jime');
    // });
    app.routeToTest();
    const spy = router.navigate as jasmine.Spy;
    const navArgs = spy.calls.mostRecent().args[0];
    expect(navArgs[0]).toBe('/test');
    expect(navArgs[1]['name']).toBe('jime');
  }));
});
