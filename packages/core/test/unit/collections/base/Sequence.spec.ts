import { Sequence } from '../../../..';

const TEST_ITEMS: string[] = ['one', 'two', 'three'];

export function testSequence(create: <T>(items?: Sequence<T>) => Sequence<T>) {
  describe('Sequence', function() {
    describe('constructor()', function() {
      it('should create empty sequence', function() {
        const list = create();

        expect(list.length).toBe(0);
      });

      it('should create sequence with given items', function() {
        const list = create(['a', 'b', 'c', 'd']);

        expect(list.length).toBe(4);
      });
    });

    describe('for...of', function() {
      it('should accept empty sequence', function() {
        const instance: Sequence<string> = create();
        const mock = jest.fn();

        for (const word of instance) {
          mock(word);
        }

        expect(mock).toHaveBeenCalledTimes(0);
      });

      it('should iterate sequence', function() {
        const instance: Sequence<string> = create(TEST_ITEMS);
        const mock = jest.fn();

        for (const word of instance) {
          mock(word);
        }

        expect(mock).toHaveBeenCalledTimes(TEST_ITEMS.length);
        expect(mock).toHaveBeenNthCalledWith(1, 'one');
        expect(mock).toHaveBeenNthCalledWith(2, 'two');
        expect(mock).toHaveBeenNthCalledWith(3, 'three');
      });

      it('should allow interruption of iteration', function() {
        const instance: Sequence<string> = create(TEST_ITEMS);
        let index: number = 0;

        for (const name of instance) {
          if (name === 'two') {
            break;
          }

          index += 1;
        }

        expect(index).toBe(1);
      });
    });
  });
}
