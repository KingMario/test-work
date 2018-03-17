import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { NameService } from './name.service';

describe(`NameService`, () => {
  let injector: TestBed;
  let httpMock: HttpTestingController;
  let nameService: NameService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NameService]
    });
    injector = getTestBed();
    httpMock = injector.get(HttpTestingController);
    nameService = injector.get(NameService);
  });

  it('should test getUrl', () => {
    nameService.getUrl().subscribe();
    const req = httpMock.expectOne('https://angular.io/guide/testing');
    expect(req.request.method).toBe('GET');
  });
});
