import {
  FilterDecision,
  Level,
  LogEvent,
  ThresholdFilter
} from '../../..';
import { Filter } from '@monument/contracts';

describe('ThresholdFilter', function() {
  function test(filter: Filter, decisions: FilterDecision[]) {
    expect(filter.decide(new LogEvent('TestClass', Level.ERROR, 'Error'))).toBe(decisions[0]);
    expect(filter.decide(new LogEvent('TestClass', Level.WARNING, 'Warning'))).toBe(decisions[1]);
    expect(filter.decide(new LogEvent('TestClass', Level.INFO, 'Info'))).toBe(decisions[2]);
    expect(filter.decide(new LogEvent('TestClass', Level.DEBUG, 'Debug'))).toBe(decisions[3]);
    expect(filter.decide(new LogEvent('TestClass', Level.TRACE, 'Trace'))).toBe(decisions[4]);
  }

  describe('filter()', function() {
    it('should filter with threshold=OFF', function() {
      const filter = new ThresholdFilter(Level.OFF);
      test(filter, [
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY
      ]);
    });

    it('should filter with threshold=ERROR', function() {
      const filter = new ThresholdFilter(Level.ERROR);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY
      ]);
    });

    it('should filter with threshold=WARNING', function() {
      const filter = new ThresholdFilter(Level.WARNING);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.DENY,
        FilterDecision.DENY,
        FilterDecision.DENY
      ]);
    });

    it('should filter with threshold=INFO', function() {
      const filter = new ThresholdFilter(Level.INFO);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.DENY,
        FilterDecision.DENY
      ]);
    });

    it('should filter with threshold=DEBUG', function() {
      const filter = new ThresholdFilter(Level.DEBUG);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.DENY
      ]);
    });

    it('should filter with threshold=TRACE', function() {
      const filter = new ThresholdFilter(Level.TRACE);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL
      ]);
    });

    it('should filter with threshold=ALL', function() {
      const filter = new ThresholdFilter(Level.ALL);
      test(filter, [
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL,
        FilterDecision.NEUTRAL
      ]);
    });
  });
});
