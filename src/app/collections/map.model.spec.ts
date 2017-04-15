import { Map } from '.';

describe("Map", () => {
  let map;

  beforeEach(() => {
    map = new Map<any>();
  })

  it('should construct properly', () => {
    expect(map).toBeTruthy();
  });

});
