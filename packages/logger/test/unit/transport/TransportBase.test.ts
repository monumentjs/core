import { FilterDecision, Level, LogEvent, TagFilter, LogEventHistory, ThresholdFilter } from '../../..';

describe('TransportBase', function() {
  describe('next()', function() {
    it('should forward all events by default', function() {
      const transport = new LogEventHistory();

      expect(transport.filters.length).toBe(0);

      const events = [
        new LogEvent('TestClass', Level.TRACE, 'Message'),
        new LogEvent('TestClass', Level.DEBUG, 'Message'),
        new LogEvent('TestClass', Level.INFO, 'Message'),
        new LogEvent('TestClass', Level.WARNING, 'Message'),
        new LogEvent('TestClass', Level.ERROR, 'Message')
      ];

      events.forEach(event => transport.next(event));

      expect(transport.events).toEqual(events);
    });

    it('should filter log event before forwarding it', function() {
      const transport = new LogEventHistory([
        new ThresholdFilter(Level.WARNING),
        new TagFilter('Hardware', FilterDecision.ALLOW, FilterDecision.DENY)
      ]);

      expect(transport.filters.length).toBe(2);

      const eventsWithoutTags = [
        new LogEvent('TestClass', Level.TRACE, 'Message'),
        new LogEvent('TestClass', Level.DEBUG, 'Message'),
        new LogEvent('TestClass', Level.INFO, 'Message'),
        new LogEvent('TestClass', Level.WARNING, 'Message'),
        new LogEvent('TestClass', Level.ERROR, 'Message')
      ];

      const eventsWithTags = [
        new LogEvent('TestClass', Level.TRACE, 'Message', undefined, ['Hardware']),
        new LogEvent('TestClass', Level.DEBUG, 'Message', undefined, ['Hardware']),
        new LogEvent('TestClass', Level.INFO, 'Message', undefined, ['Hardware']),
        new LogEvent('TestClass', Level.WARNING, 'Message', undefined, ['Hardware']),
        new LogEvent('TestClass', Level.ERROR, 'Message', undefined, ['Hardware'])
      ];

      eventsWithoutTags.forEach(event => transport.next(event));

      expect(transport.events.length).toBe(0);

      eventsWithTags.forEach(event => transport.next(event));

      expect(transport.events).toEqual(eventsWithTags.slice(3));
    });
  });
});
