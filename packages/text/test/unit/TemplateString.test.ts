import { TemplateString } from '../../src/printing/model/TemplateString';

describe('TemplateString', function() {
  describe('constructor(string, ReadOnlyMap)', function() {
    it('should replace entries provided as object', function() {
      expect(new TemplateString('My name is { name }.', {
        name: 'Alex'
      }).toString()).toEqual('My name is Alex.');
    });

    it('should replace entries provided as array', function() {
      expect(new TemplateString('Hi {0}! My name is { 1 }.', ['Alex', 'Bob']).toString()).toEqual('Hi Alex! My name is Bob.');
    });
  });
});
