import {Obj} from '.';

describe("Util Object library", () => {
  it('should have access to Object Utils', () => {
    expect(Obj).toBeDefined();
  });

  it('should be able to say whether a given object is null or undefined', () => {
    expect(Obj.isNullOrUndefined(null)).toEqual(true);
  });

  it('should be able to clone an object', () => {
    let obj = {a: 1, b: 2, c: 3};
    let obj2 = Obj.clone(obj);
    expect(Obj.equals(obj, obj2)).toBeTruthy();
    expect(Obj.hasKey(obj2, 'a')).toBeTruthy();
    expect(Obj.hasKey(obj2, 'b')).toBeTruthy();
    expect(Obj.hasKey(obj2, 'c')).toBeTruthy();
    expect(obj2.a).toBe(1);
    expect(obj2.b).toBe(2);
    expect(obj2.c).toBe(3);
  });

});