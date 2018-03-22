import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NameService } from './name.service';
import { HttpModule, XHRBackend, Response, ResponseOptions, Headers, Http } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

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

  it('should test getUrl', () => {
    nameService.getData().subscribe();
    const req = httpClientMock.expectOne('https://angular.io/guide/testing');
    expect(req.request.method).toBe('GET');
  });

  it('should test get', () => {
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
});
