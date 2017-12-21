import { List } from '.';
import { Rand } from '../utils';

describe("List", () => {
  let list;

  beforeEach(() => {
    list = new List<any>();
  })

  it('should construct properly', () => {
    expect(list).toBeTruthy();
  });

  // add
  it('should add items correctly', () => {
    list.empty();
    expect(list.size()).toBe(0);
    
    list.add(null);
    expect(list.size()).toBe(0);
    
    let item1 = {};
    list.add(item1);
    expect(list.size()).toBe(1);

    let item2 = {};
    let item3 = {};
    list.add(item2);
    list.add(item3);
    expect(list.size()).toBe(3);

    list.add(null);
    expect(list.size()).toBe(3);

    list.empty();

    list.add(item1, item2, item3);
    expect(list.contains(item1)).toBeTruthy();
    expect(list.contains(item2)).toBeTruthy();
    expect(list.contains(item3)).toBeTruthy();
    expect(list.size()).toBe(3);
  });

  // remove
  it('should remove items correctly', () => {
    let item1 = {};
    let item2 = {};
    let item3 = {};
    list.add(item1);
    list.add(item2);
    list.add(item3);
    expect(list.size()).toBe(3);

    expect(list.contains(item1)).toBeTruthy();
    list.remove(item1);
    expect(list.size()).toBe(2);
    expect(list.contains(item1)).toBeFalsy();

    expect(list.contains(item2)).toBeTruthy();
    list.remove(item2);
    expect(list.size()).toBe(1);
    expect(list.contains(item2)).toBeFalsy();

    expect(list.contains(item3)).toBeTruthy();
    list.remove(item3);
    expect(list.size()).toBe(0);
    expect(list.contains(item3)).toBeFalsy();
    expect(list.hasElements()).toBeFalsy();
    expect(list.isEmpty()).toBeTruthy();
  });

  // empty
  it('should empty correctly', () => {
    let item1 = {};
    let item2 = {};
    let item3 = {};
    list.add(item1);
    list.add(item2);
    list.add(item3);
    expect(list.size()).toBe(3);
    let items = list.empty();
    expect(list.size()).toBe(0);
    expect(items).toBeTruthy();
    expect(items.length).toBe(3);
    expect(list.hasElements()).toBeFalsy();
    expect(list.isEmpty()).toBeTruthy();
  })

  // index of
  it('should return indexOf correctly', () => {   
    let item1 = {};
    let item2 = {};
    let item3 = {};
    list.add(item1);
    list.add(item2);
    list.add(item3);
    expect(list.size()).toBe(3);

    expect(list.indexOf(item1)).toBe(0);
    expect(list.indexOf(item2)).toBe(1);
    expect(list.indexOf(item3)).toBe(2);
    expect(list.indexOf(null)).toBe(-1);
    expect(list.indexOf(undefined)).toBe(-1);

    let item4 = {};
    expect(list.indexOf(item4)).toBe(-1);
    list.add(item4);
    expect(list.indexOf(item4)).toBe(3);

    list.remove(item2);
    expect(list.indexOf(item1)).toBe(0);
    expect(list.indexOf(item2)).toBe(-1);
    expect(list.indexOf(item3)).toBe(1);
    expect(list.indexOf(item4)).toBe(2);
  });

  // get
  it('should get successfully', () => {
    let guid = Rand.guid();
    let item1 = {};
    list.addOne(item1, guid);
    let gottenItem = list.get(guid);
    expect(gottenItem).toBeTruthy();
    expect(gottenItem).toEqual(item1);
  });

  // contains
  it('should return whether an item is contained within the list', () => {
    let item1 = {};
    list.add(item1);
    expect(list.contains(item1)).toBeTruthy();
    expect(list.contains(null)).toBeFalsy();

    let item2 = {};
    expect(list.contains(item2)).toBeFalsy();
    list.add(item2);
    expect(list.contains(item2)).toBeTruthy();
  });

  // fromJson
  it('should be able to convert from json', () => {
    let json = [
      {_list_item_id: 'foo'},
      {_list_item_id: 'bar'},
      {_list_item_id: 'baz'}
    ];
    list.fromJson(json);
    expect(list.size()).toBe(3);
  });

  // toJson
  it('should be able to convert to json', () => {
    let item1 = {};
    let item2 = {};
    let item3 = {};
    list.add(item1, item2, item3);

    let json = list.toJson();
    expect(json).toBeTruthy();
    expect(json.length).toBe(3);
    for(let i = 0; i < json.length; i++) {
      let item = json[i];
      expect(list.contains(item)).toBeTruthy();
    }
  });

  it('should have synchronous for each loop', () => {

    let item1 = {};
    let item2 = {};
    let item3 = {};
    let item4 = {};
    let item5 = {};

    list.add(item1, item2, item3, item4, item5);
    let count = 0;
    list.forEach((itm: any, i: number) => {
      count++;
    });
    expect(count).toEqual(5);
  });

});
