import { forEach } from '../../../src/operators/forEach';

describe('forEach()', function() {
  it('should consume each item of source', function() {
    const source = ['a', 'b', 'c'];
    const consume = jest.fn();

    forEach(source, consume);

    expect(consume).toHaveBeenCalledTimes(3);
    expect(consume).toHaveBeenNthCalledWith(1, 'a', 0);
    expect(consume).toHaveBeenNthCalledWith(2, 'b', 1);
    expect(consume).toHaveBeenNthCalledWith(3, 'c', 2);

    expect(consume).toHaveNthReturnedWith(1, undefined);
    expect(consume).toHaveNthReturnedWith(2, undefined);
    expect(consume).toHaveNthReturnedWith(3, undefined);
  });

  it('should stop when consumer returned `false`', function() {
    const source = ['a', 'b', 'c'];
    const consume = jest.fn((value, index) => index < 1);

    forEach(source, consume);

    expect(consume).toHaveBeenCalledTimes(2);
    expect(consume).toHaveBeenNthCalledWith(1, 'a', 0);
    expect(consume).toHaveBeenNthCalledWith(2, 'b', 1);

    expect(consume).toHaveNthReturnedWith(1, true);
    expect(consume).toHaveNthReturnedWith(2, false);
  });
});
