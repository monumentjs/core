import { NamedPool } from '../../../src/base/NamedPool';
import { aggregate } from '../../../src/operators/aggregate';

describe('aggregate()', function() {
  it('should aggregate list data into new value', function() {
    const source: Array<string> = ['one', 'two', 'three'];
    const result: NamedPool<boolean> = aggregate(source, (obj: NamedPool<boolean>, item: string): NamedPool<boolean> => {
      obj[item] = true;

      return obj;
    }, {});

    expect(result).toEqual({
      one: true,
      two: true,
      three: true
    });
  });
});
