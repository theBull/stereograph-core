import {Obj} from '.';

describe("Util Object library", () => {
  it('should have access to Object Utils', () => {
    expect(Obj).toBeDefined();
  });

  it('should be able to say whether a given object is null or undefined', () => {
    expect(Obj.isNullOrUndefined(null)).toEqual(true);
  });

});