import { QueryParameters } from '..';

describe('QueryParameters', function() {
  describe('constructor(string)', function() {
    it('should parse query string', function() {
      const parameters: QueryParameters = new QueryParameters('q=javascript%20tutorials&p=10&safe=true&lat=1.203&lon=3.402');

      expect(parameters.getString('q')).toBe('javascript tutorials');
      expect(parameters.getString('qq', 'default')).toBe('default');
      expect(parameters.getString('qqq')).toBe(undefined);
      expect(parameters.getInteger('p')).toBe(10);
      expect(parameters.getInteger('pp', 25)).toBe(25);
      expect(parameters.getInteger('ppp')).toBe(undefined);
      expect(parameters.getBoolean('safe')).toBe(true);
      expect(parameters.getBoolean('Safe')).toBe(undefined);
      expect(parameters.getFloat('lat')).toBe(1.203);
      expect(parameters.getFloat('lon')).toBe(3.402);
      expect(parameters.getFloat('scale', 0)).toBe(0);
      expect(parameters.getFloat('scale')).toBe(undefined);
    });
  });

  describe('getFloats(string)', function() {
    it('should parse all associated values to float', function() {
      const parameters: QueryParameters = new QueryParameters('p=1.23&p=4.56&p=7.89');
      const p: number[] = [...parameters.getFloats('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual([1.23, 4.56, 7.89]);
    });
  });

  describe('getIntegers(string)', function() {
    it('should parse all associated values to int', function() {
      const parameters: QueryParameters = new QueryParameters('p=1&p=4&p=7');
      const p: number[] = [...parameters.getIntegers('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual([1, 4, 7]);
    });
  });

  describe('getStrings(string)', function() {
    it('should get all associated values as strings', function() {
      const parameters: QueryParameters = new QueryParameters('p=1&p=4&p=7');
      const p: string[] = [...parameters.getStrings('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual(['1', '4', '7']);
    });
  });
});
