import { Set } from '.';
import { Rand, Obj } from '../utils';

describe("Set", () => {
  let set;

  beforeEach(() => {
    set = new Set<any>();
  })

  it('should construct properly', () => {
    expect(set).toBeTruthy();
  });

  // add
  it('should add items correctly', () => {
    set.empty();
    expect(set.size()).toBe(0);
    
    try {
      expect(set.add(null)).toThrow();
    } catch(e) {}
    
    try {
      expect(set.add({})).toThrow();
    } catch(e) {}

    set.add('key1', 'baz');
    expect(set.size()).toBe(1);
    expect(set.size('key1')).toBe(1);

    set.add('key2', 'foo');
    set.add('key3', 'bar');
    expect(set.size()).toBe(3);

    set.empty();
    expect(set.size()).toBe(0);

    set.add('key4', {}, {}, {}, {});
    expect(set.size('key4')).toBe(4);
    expect(set.size()).toBe(4);

    set.add('key5', 1, 2, 3);
    set.add('key6', 'a', 'b', 'c');
    expect(set.size()).toBe(10);

    set.add('key4', null);
    expect(set.size()).toBe(6);
  });
 
  it('should pop items correctly', () => {
    set.add('set1', 'a', 'b', 'c');
    let item = set.pop('set1');
    expect(item).toBe('c');
    expect(set.size()).toBe(2);

    set.add('set2', 'a');
    set.pop('set2');

    // pop off a second time after set is empty
    try {
      expect(set.pop('set2')).toThrow();
    } catch(e) {}
  });

  // remove
  it('should remove items correctly', () => {
    set.add('item1', {});
    set.add('item2', {});
    set.add('item3', {});
    expect(set.size()).toBe(3);
    expect(set.size('item1')).toBe(1);
    expect(set.size('item2')).toBe(1);
    expect(set.size('item3')).toBe(1);
    expect(set.remove('item1')).toBeDefined();

    try {
      expect(set.size('item1')).toThrow();
    } catch(e) {}

    try {
      expect(set.remove('item1')).toThrow();
    } catch(e) {}
  });

  // empty
  it('should empty correctly', () => {
    set.add('key1', {});
    set.add('key2', {});
    set.empty();
    expect(set.size()).toBe(0);
  });

  // get
  it('should get successfully', () => {
    set.add('key1', {});
    let value = set.get('key1');
    expect(Obj.equals(value, [{}])).toBeTruthy();

    set.remove('key1');

    try{
      expect(set.get('key1')).toThrow();
    } catch(e) {

    }
  });

  // contains
  it('should return whether an item is contained within the list', () => {
    
  });

  // fromJson
  it('should be able to convert from json', () => {
    let json = {
      'key1': null,
      'key2': [1, 2, 3],
      'key3': [],
      'key4': undefined
    };

    set.fromJson(json);

    expect(Obj.equals(set.toJson(), {
      'key1': null,
      'key2': [1, 2, 3],
      'key3': [],
      'key4': null
    })).toBeTruthy();
  });

  // toJson
  it('should be able to convert to json', () => {
    set.add('1', 1, 2, 3, 4, 5);
    set.add('2', null);
    set.add('3', 'foo', 'bar', 'baz');

    expect(Obj.equals(set.toJson(), {
      '1': [1, 2, 3, 4, 5],
      '2': null,
      '3': ['foo', 'bar', 'baz']
    })).toBeTruthy();
  });

  it('should have synchronous for each loop', () => {
    let test = true;

    // shouldn't run since set is empty
    set.forEach((key: string|number) => {
      test = false;
    });
    expect(test).toBe(true);


    set.add('key1', 1);
    set.forEach((key: string|number) => {
      test = false;
    });
    expect(test).toBe(false);

    let count = 0;
    let arr = [];
    set.add('key2', 1);
    set.add('key3', 1);
    set.forEach((key: string|number) => {
      count++;
      arr.push(key);
    });
    expect(count).toBe(3);
    expect(Obj.equals(arr, ['key1', 'key2', 'key3'])).toBe(true);
  });

  it('should have an each method that executes for each item of the given key', () => {
    set.add('key1', 1, 2, 3, 4, 5);
    let arr = [];
    set.each('key1', (item: number, index: number) => {
      arr.push(item);
    });
    expect(Obj.equals(arr, [1, 2, 3, 4, 5])).toBeTruthy();
  });

  it('should be able to return the first item of the set', () => {
    set.add('key1', 1, 2, 3, 4, 5);
    expect(set.first('key1')).toEqual(1);

    set.add('key2');
    expect(set.first('key2')).toEqual(null);
  });

});
