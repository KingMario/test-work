
describe('describe', () => {
  let foo, bar;
  beforeAll(() => {
    foo = {
      setBar: (val) => {
        bar = val;
      },
      getBar: () => {
        return bar;
      },
      setBarByPromise: () => {
        return Promise.resolve(15).then((data) =>  foo.setBar(data));
      }
    };
  });

  beforeEach(() => {
    bar = 0;
  });

  it('should test assert', () => {
    bar = 10;
    expect(bar).toBe(10);
  });

  it('should test spy', () => {
    spyOn(foo, 'setBar').and.callThrough();
    spyOn(foo, 'getBar').and.returnValue(30);
    foo.setBar(123);
    expect(foo.setBar).toHaveBeenCalled();
    expect(foo.setBar.calls.mostRecent().args[0]).toBe(123);
    expect(foo.getBar()).toBe(30);
  });

  it('should test async', (done) => {
    foo.setBarByPromise().then(() => {
      expect(bar).toBe(15);
      done();
    });
    expect(bar).toBe(0);
  });
});
