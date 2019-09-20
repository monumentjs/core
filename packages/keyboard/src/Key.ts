import { Equatable } from '@monument/contracts';

export class Key implements Equatable<Key> {
  static readonly BACKSPACE = new Key(8, 'Backspace', 'Backspace');
  static readonly TAB = new Key(9, 'Tab', 'Tab');
  static readonly ENTER = new Key(13, 'Enter', 'Enter');
  static readonly SHIFT = new Key(16, 'Shift');
  static readonly SHIFT_LEFT = new Key(16, 'Shift', 'ShiftLeft');
  static readonly SHIFT_RIGHT = new Key(16, 'Shift', 'ShiftRight');
  static readonly CONTROL = new Key(17, 'Control');
  static readonly CONTROL_LEFT = new Key(17, 'ControlLeft');
  static readonly CONTROL_RIGHT = new Key(17, 'ControlRight');
  static readonly ALT = new Key(18, 'Alt');
  static readonly ALT_LEFT = new Key(18, 'Alt', 'AltLeft');
  static readonly ALT_RIGHT = new Key(18, 'Alt', 'AltRight');
  static readonly CAPS_LOCK = new Key(20, 'CapsLock');
  static readonly ESCAPE = new Key(27, 'Escape');
  static readonly SPACE = new Key(32, 'Space');
  static readonly META_LEFT = new Key(91, 'Meta', 'MetaLeft');
  static readonly META_RIGHT = new Key(93, 'Meta', 'MetaRight');

  constructor(readonly code: number, readonly key: string, readonly name?: string) {}

  equals(other: Key): boolean {
    return this.code === other.code && this.key === other.key && this.name === other.name;
  }
}
