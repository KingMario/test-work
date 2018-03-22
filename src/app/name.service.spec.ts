import { Observable } from 'rxjs/Observable';
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NameService } from './name.service';
import { HttpModule, XHRBackend, Response, ResponseOptions, Headers, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import 'rxjs/add/observable/of';
import { HttpClient } from '@angular/common/http';

describe(`NameService`, () => {
  let injector: TestBed;
  let httpClientMock: HttpTestingController;
  let nameService: NameService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpModule],
      providers: [
        NameService,
        { provide: XHRBackend, useClass: MockBackend }
      ]
    });
    injector = getTestBed();
    httpClientMock = injector.get(HttpTestingController);
    nameService = injector.get(NameService);
  });

  it('should test getData', () => {
    nameService.getData().subscribe();
    const req = httpClientMock.expectOne('https://angular.io/guide/testing');
    expect(req.request.method).toBe('GET');
    // req.flush({});  set response
  });

  it('should test getData by spy', () => {
    const httpClient = TestBed.get(HttpClient);
    spyOn(httpClient, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: 'succes',
      headers: new Headers({sessionId: 'test succes'})
    }))));
    nameService.getData().subscribe();
    expect(httpClient.get.calls.mostRecent().args[0]).toBe('https://angular.io/guide/testing');
  });

  it('should test getDataByHttp', () => {
    const httpMock: MockBackend = TestBed.get(XHRBackend);
    httpMock.connections.subscribe((connection: MockConnection) => {
      expect(connection.request.url).toBe('https://angular.io/guide/testing');
      connection.mockRespond(new Response(new ResponseOptions({
        body: 'succes',
        headers: new Headers({sessionId: 'test succes'})
      })));
    });
    nameService.getDataByHttp().subscribe((res) => {
      expect(res.text()).toBe('succes');
    });
  });

  it('should test getDataByHttp by spy', () => {
    const http = TestBed.get(Http);
    spyOn(http, 'get').and.returnValue(Observable.of(new Response(new ResponseOptions({
      body: 'succes',
      headers: new Headers({sessionId: 'test succes'})
    }))));
    nameService.getDataByHttp().subscribe((res) => {
      expect(res.text()).toBe('succes');
    });
    expect(http.get.calls.mostRecent().args[0]).toBe('https://angular.io/guide/testing');
  });
});
