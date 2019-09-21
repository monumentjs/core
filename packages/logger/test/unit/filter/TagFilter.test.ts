import { FilterDecision, LogEvent, TagFilter } from '../../..';
import { Level } from '@monument/contracts';

describe('TagFilter', function() {
  describe('filter()', function() {
    it('should check that event contains specific tag', function() {
      const filter = new TagFilter('LowMemory', FilterDecision.NEUTRAL, FilterDecision.DENY);

      expect(
        filter.decide(new LogEvent('ClassName', Level.INFO, 'Message', undefined, ['CPUOverload']))
      ).toBe(FilterDecision.DENY);

      expect(
        filter.decide(new LogEvent('ClassName', Level.INFO, 'Message', undefined, ['CPUOverload', 'LowMemory']))
      ).toBe(FilterDecision.NEUTRAL);
    });
  });
});
