import { FilterDecision, Level, LogEvent, NameFilter } from '../../..';

describe('NameFilter', function() {
  describe('filter()', function() {
    it('should check that event contains specific tag', function() {
      const filter = new NameFilter('A', FilterDecision.NEUTRAL, FilterDecision.DENY);

      expect(
        filter.decide(new LogEvent('A', Level.INFO, 'Message'))
      ).toBe(FilterDecision.NEUTRAL);

      expect(
        filter.decide(new LogEvent('B', Level.INFO, 'Message'))
      ).toBe(FilterDecision.DENY);
    });
  });
});
