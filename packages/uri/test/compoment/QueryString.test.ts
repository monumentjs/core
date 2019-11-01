import { QueryString } from '../../src/parsing/component/QueryString';

describe('QueryString', function() {
  describe('constructor(string)', function() {
    it('[empty string]', function() {
      expect(new QueryString('')).toMatchObject({
        entries: []
      });
    });

    it('a=', function() {
      expect(new QueryString('a=')).toMatchObject({
        entries: [
          ['a', '']
        ]
      });
    });

    it('a=b', function() {
      expect(new QueryString('a=b')).toMatchObject({
        entries: [
          ['a', 'b']
        ]
      });
    });

    it('a=b&c=d', function() {
      expect(new QueryString('a=b&c=d')).toMatchObject({
        entries: [
          ['a', 'b'],
          ['c', 'd']
        ]
      });
    });

    it('a=b&c=d%20d', function() {
      expect(new QueryString('a=b&c=d%20d')).toMatchObject({
        entries: [
          ['a', 'b'],
          ['c', 'd d']
        ]
      });
    });
  });

  describe('toString()', function() {
    it('', function() {
      expect(new QueryString('').toString()).toEqual('');
    });

    it('a=', function() {
      expect(new QueryString('a=').toString()).toEqual('a=');
    });

    it('a=b', function() {
      expect(new QueryString('a=b').toString()).toEqual('a=b');
    });

    it('a=b&c=d', function() {
      expect(new QueryString('a=b&c=d').toString()).toEqual('a=b&c=d');
    });

    it('a=b&c=d%20d', function() {
      expect(new QueryString('a=b&c=d%20d').toString()).toEqual('a=b&c=d%20d');
    });
  });
});
