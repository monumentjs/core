import { ConsoleTransport, Level, LogEvent } from '../../..';

describe('ConsoleTransport', function() {
  let transport: ConsoleTransport;

  beforeEach(() => {
    transport = new ConsoleTransport({
      transform(event: LogEvent): string {
        return `[${Level[event.level]}] ${event.logger}: ${event.message}`;
      }
    });
  });

  describe('next()', function() {
    it('should call console.trace method with log event', function() {
      const spy = spyOn(console, 'trace');

      transport.next(new LogEvent('ClassName', Level.TRACE, 'Message'));

      expect(spy).toHaveBeenNthCalledWith(1, '[TRACE] ClassName: Message');
    });

    it('should call console.debug method with log event', function() {
      const spy = spyOn(console, 'debug');

      transport.next(new LogEvent('ClassName', Level.DEBUG, 'Message'));

      expect(spy).toHaveBeenNthCalledWith(1, '[DEBUG] ClassName: Message');
    });

    it('should call console.info method with log event', function() {
      const spy = spyOn(console, 'info');

      transport.next(new LogEvent('ClassName', Level.INFO, 'Message'));

      expect(spy).toHaveBeenNthCalledWith(1, '[INFO] ClassName: Message');
    });

    it('should call console.warn method with log event', function() {
      const spy = spyOn(console, 'warn');

      transport.next(new LogEvent('ClassName', Level.WARNING, 'Message'));

      expect(spy).toHaveBeenNthCalledWith(1, '[WARNING] ClassName: Message');
    });

    it('should call console.error method with log event', function() {
      const spy = spyOn(console, 'error');

      transport.next(new LogEvent('ClassName', Level.ERROR, 'Message'));

      expect(spy).toHaveBeenNthCalledWith(1, '[ERROR] ClassName: Message');
    });
  });
});
