import { Actions } from '@monument/store';
import { Level, Logger, LoggerManager, LogEventHistory } from '../../..';

describe('Logger', function() {
  const actions: Actions = new Actions();
  const transport: LogEventHistory = new LogEventHistory();
  const manager: LoggerManager = new LoggerManager(actions, {
    transports: [transport]
  });
  const log: Logger = manager.get('TestClass');

  describe('trace()', () => {
    it('should log TRACE-level event', () => {
      log.trace('A regular event happen');

      expect(transport.events.length).toBe(1);
      expect(transport.events[0].message).toBe('A regular event happen');
      expect(transport.events[0].level).toBe(Level.TRACE);
    });
  });

  describe('debug()', () => {
    it('should log DEBUG-level event', () => {
      log.debug('Log current state');

      expect(transport.events.length).toBe(2);
      expect(transport.events[1].message).toBe('Log current state');
      expect(transport.events[1].level).toBe(Level.DEBUG);
    });
  });

  describe('info()', () => {
    it('should log INFO-level event', () => {
      log.info('Print execution status');

      expect(transport.events.length).toBe(3);
      expect(transport.events[2].message).toBe('Print execution status');
      expect(transport.events[2].level).toBe(Level.INFO);
    });
  });

  describe('warning()', () => {
    it('should log WARNING-level event', () => {
      log.warning('Attract attention');

      expect(transport.events.length).toBe(4);
      expect(transport.events[3].message).toBe('Attract attention');
      expect(transport.events[3].level).toBe(Level.WARNING);
    });
  });

  describe('error()', () => {
    it('should log ERROR-level event with error message', () => {
      log.error('Error occurred');

      expect(transport.events.length).toBe(5);
      expect(transport.events[4].message).toBe('Error occurred');
      expect(transport.events[4].level).toBe(Level.ERROR);
    });

    it('should log ERROR-level event with error instance', () => {
      log.error(new Error('Error occurred'));

      expect(transport.events.length).toBe(6);
      expect(transport.events[5].message).toBe('Error occurred');
      expect(transport.events[5].level).toBe(Level.ERROR);
    });
  });
});
