import { Actions } from '@monument/store';
import { Level, LoggerManager, StringLayout, TestTransport } from '../..';

describe('LoggerManager', function() {
  const actions = new Actions();
  const manager = new LoggerManager(actions);
  const layout = new StringLayout('{level}: {message}');
  const transport = new TestTransport(actions, layout);
  const log = manager.get('TestClass');

  it('trace()', () => {
    log.trace('A regular event happen');

    expect(transport.messages.length).toBe(1);
    expect(transport.messages[0]).toBe('TRACE: A regular event happen');
    expect(transport.actions.length).toBe(1);
    expect(transport.actions[0].message).toBe('A regular event happen');
    expect(transport.actions[0].level).toBe(Level.TRACE);
  });

  it('debug()', () => {
    log.debug('Log current state');

    expect(transport.messages.length).toBe(2);
    expect(transport.messages[1]).toBe('DEBUG: Log current state');
    expect(transport.actions.length).toBe(2);
    expect(transport.actions[1].message).toBe('Log current state');
    expect(transport.actions[1].level).toBe(Level.DEBUG);
  });

  it('info()', () => {
    log.info('Print execution status');

    expect(transport.messages.length).toBe(3);
    expect(transport.messages[2]).toBe('INFO: Print execution status');
    expect(transport.actions.length).toBe(3);
    expect(transport.actions[2].message).toBe('Print execution status');
    expect(transport.actions[2].level).toBe(Level.INFO);
  });

  it('warning()', () => {
    log.warning('Attract attention');

    expect(transport.messages.length).toBe(4);
    expect(transport.messages[3]).toBe('WARNING: Attract attention');
    expect(transport.actions.length).toBe(4);
    expect(transport.actions[3].message).toBe('Attract attention');
    expect(transport.actions[3].level).toBe(Level.WARNING);
  });

  it('error()', () => {
    log.error('Error occurred');

    expect(transport.messages.length).toBe(5);
    expect(transport.messages[4]).toBe('ERROR: Error occurred');
    expect(transport.actions.length).toBe(5);
    expect(transport.actions[4].message).toBe('Error occurred');
    expect(transport.actions[4].level).toBe(Level.ERROR);
  });

  it('fatal()', () => {
    log.fatal('Fatal error occurred');

    expect(transport.messages.length).toBe(6);
    expect(transport.messages[5]).toBe('FATAL: Fatal error occurred');
    expect(transport.actions.length).toBe(6);
    expect(transport.actions[5].message).toBe('Fatal error occurred');
    expect(transport.actions[5].level).toBe(Level.FATAL);
  });
});
