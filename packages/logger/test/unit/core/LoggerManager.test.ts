import { Actions } from '@monument/store';
import { Logger, LoggerManager, LogEventHistory } from '../../..';

describe('LoggerManager', function() {
  let actions: Actions;
  let transport: LogEventHistory;
  let manager: LoggerManager;

  beforeEach(() => {
    actions = new Actions();
    transport = new LogEventHistory();
    manager = new LoggerManager(actions, {
      transports: [transport]
    });
  });

  afterEach(() => {
    manager.dispose();
  });

  describe('get()', function() {
    it('should get logger with default name', () => {
      const log = manager.get();

      expect(log).toBeInstanceOf(Logger);
      expect(log.name).toBe('');
    });

    it('should get logger by custom', () => {
      const log = manager.get('TestClass');

      expect(log).toBeInstanceOf(Logger);
      expect(log.name).toBe('TestClass');
    });
  });
});
