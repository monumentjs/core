import { isEven, isOdd, ReadOnlyCollection, ReadOnlyCollectionImpl } from '../../../../..';

describe('ReadOnlyCollectionImpl', function() {
  describe('lazy calculations', function() {
    test('concat()', () => {
      const a: number[] = [1, 2, 3];
      const b: number[] = [5, 6, 7];
      const result: ReadOnlyCollection<number> = new ReadOnlyCollectionImpl(a).concat(b);

      expect(result.length).toBe(6);
      expect(result.containsAll([1, 2, 3, 5, 6, 7]));

      a.push(4);

      expect(result.length).toBe(7);
      expect(result.containsAll([1, 2, 3, 4, 5, 6, 7]));

      b.push(8);

      expect(result.length).toBe(8);
      expect(result.containsAll([1, 2, 3, 4, 5, 6, 7, 8]));
    });

    test('findAll()', () => {
      const numbers: number[] = [1, 2, 3];
      const source = new ReadOnlyCollectionImpl(numbers);
      const evenItems = source.findAll(isEven);

      expect(evenItems.length).toBe(1);
      expect(evenItems.containsAll([2])).toBe(true);

      numbers.push(4, 5);

      expect(evenItems.length).toBe(2);
      expect(evenItems.containsAll([2, 4])).toBe(true);
    });

    test('map()', () => {
      const numbers: number[] = [1, 2, 3];
      const source: ReadOnlyCollectionImpl<number> = new ReadOnlyCollectionImpl(numbers);
      const result: ReadOnlyCollection<number> = source.map((num: number): number => {
        return num ** 2;
      });

      expect(result.length).toBe(3);
      expect(result.containsAll([1, 4, 9])).toBe(true);
    });
  });

  describe('chaining', function() {
    test('findAll() then map()', function() {
      const numbers: number[] = [1, 2, 3];
      const source: ReadOnlyCollectionImpl<number> = new ReadOnlyCollectionImpl(numbers);
      const evenNumbers: ReadOnlyCollection<string> = source.findAll(isEven).map((n: number) => {
        return n.toString();
      });
      const oddNumbers: ReadOnlyCollection<string> = source.findAll(isOdd).map((n: number) => {
        return n.toString();
      });

      expect(evenNumbers.length).toBe(1);
      expect(evenNumbers.containsAll(['2']));

      expect(oddNumbers.length).toBe(2);
      expect(oddNumbers.containsAll(['1', '3']));

      numbers.push(4, 5);

      expect(evenNumbers.length).toBe(2);
      expect(evenNumbers.containsAll(['2', '4']));

      expect(oddNumbers.length).toBe(3);
      expect(oddNumbers.containsAll(['1', '3', '5']));
    });

    test('findAll() then take() then map()', () => {
      const numbers: number[] = [1, 2, 3];
      const source: ReadOnlyCollectionImpl<number> = new ReadOnlyCollectionImpl(numbers);
      const result: ReadOnlyCollection<string> = source
        .findAll(isEven)
        .take(3)
        .map(num => {
          return num.toString();
        });

      expect(result.length).toBe(1);
      expect(result.containsAll(['2'])).toBe(true);

      numbers.push(4, 5, 6, 7, 8, 9, 10);

      expect(result.length).toBe(3);
      expect(result.containsAll(['2', '4', '6'])).toBe(true);
    });
  });
});
