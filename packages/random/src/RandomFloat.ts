import { ToJSON, ToString } from '@monument/core';
import { RandomValue } from './RandomValue';

/**
 * @author Alex Chugaev
 * @since 0.0.1
 */
export class RandomFloat implements RandomValue<number>, ToJSON<number>, ToString {
  private readonly _min: number;
  private readonly _max: number;
  private _value?: number;

  get value(): number {
    if (this._value == null) {
      const random: number = Math.random();
      const rawValue: number = this._min + random * (this._max - this._min);

      this._value = rawValue;
    }

    return this._value;
  }

  constructor();
  constructor(min: number);
  constructor(min: number, max: number);
  constructor(min: number = Number.MIN_SAFE_INTEGER, max: number = Number.MAX_SAFE_INTEGER) {
    this._min = min;
    this._max = max;
  }

  toJSON(): number {
    return this.value;
  }

  toString(): string {
    return this.value.toString(10);
  }

  valueOf(): number {
    return this.value;
  }
}
