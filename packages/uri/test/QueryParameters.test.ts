import { Query } from '..';

describe('QueryParameters', function() {
  describe('constructor(string)', function() {
    it('should parse query string', function() {
      const parameters: Query = new Query('q=javascript%20tutorials&p=10&safe=true&lat=1.203&lon=3.402');

      expect(parameters.get('q')).toBe('javascript tutorials');
      expect(parameters.get('qq', 'default')).toBe('default');
      expect(parameters.get('qqq')).toBe(undefined);
      expect(parameters.getInt('p')).toBe(10);
      expect(parameters.getInt('pp', 25)).toBe(25);
      expect(parameters.getInt('ppp')).toBe(undefined);
      expect(parameters.getBool('safe')).toBe(true);
      expect(parameters.getBool('Safe')).toBe(undefined);
      expect(parameters.getFloat('lat')).toBe(1.203);
      expect(parameters.getFloat('lon')).toBe(3.402);
      expect(parameters.getFloat('scale', 0)).toBe(0);
      expect(parameters.getFloat('scale')).toBe(undefined);
    });
  });

  describe('getFloats(string)', function() {
    it('should parse all associated values to float', function() {
      const parameters: Query = new Query('p=1.23&p=4.56&p=7.89');
      const p: number[] = [...parameters.getFloats('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual([1.23, 4.56, 7.89]);
    });
  });

  describe('getIntegers(string)', function() {
    it('should parse all associated values to int', function() {
      const parameters: Query = new Query('p=1&p=4&p=7');
      const p: number[] = [...parameters.getAllInt('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual([1, 4, 7]);
    });
  });

  describe('getStrings(string)', function() {
    it('should get all associated values as strings', function() {
      const parameters: Query = new Query('p=1&p=4&p=7');
      const p: string[] = [...parameters.getAll('p')];

      expect(p.length).toBe(3);
      expect(p).toEqual(['1', '4', '7']);
    });
  });
});
