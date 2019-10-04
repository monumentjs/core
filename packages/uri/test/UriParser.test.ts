import { UriParser } from '..';

describe('UriParser', function() {
  const parser: UriParser = new UriParser();

  describe('canParse()', function() {
    it('should check URI has valid format', function() {
      expect(parser.canParse('/')).toBe(true);
      expect(parser.canParse('/search')).toBe(true);
      expect(parser.canParse('/search?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('/search#menu')).toBe(true);
      expect(parser.canParse('/search/user')).toBe(true);
      expect(parser.canParse('/search/user?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('/search/user#menu')).toBe(true);
      expect(parser.canParse('site.com')).toBe(true);
      expect(parser.canParse('site.com/search')).toBe(true);
      expect(parser.canParse('site.com?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('site.com#menu')).toBe(true);
      expect(parser.canParse('site.com:3000')).toBe(true);
      expect(parser.canParse('site.com:3000/search')).toBe(true);
      expect(parser.canParse('site.com:3000?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('site.com:3000#menu')).toBe(true);
      expect(parser.canParse('site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://site.com')).toBe(true);
      expect(parser.canParse('https://site.com:3000')).toBe(true);
      expect(parser.canParse('https://site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://site.com:3000?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('https://site.com:3000#menu')).toBe(true);
      expect(parser.canParse('https://site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://alex@site.com')).toBe(true);
      expect(parser.canParse('https://alex@site.com:3000')).toBe(true);
      expect(parser.canParse('https://alex@site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://alex@site.com:3000?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('https://alex@site.com:3000#menu')).toBe(true);
      expect(parser.canParse('https://alex@site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com:3000')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com:3000/search')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com:3000?a=1&b=2&c=3')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com:3000#menu')).toBe(true);
      expect(parser.canParse('https://alex:password@site.com:3000/search')).toBe(true);
    });
  });

});
