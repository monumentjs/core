import { Event } from '../event/Event';
import { EventBus } from '../event/EventBus';
import { AggregateRootException } from './AggregateRootException';

export abstract class AggregateRoot {
  private readonly _history: Array<Event> = [];
  private _autoCommit = false;
  private _eventBus?: EventBus;

  get autoCommit(): boolean {
    return this._autoCommit;
  }

  set autoCommit(value: boolean) {
    this._autoCommit = value;
  }

  apply(event: Event): void {
    if (this.autoCommit) {
      this.publish(event);
    } else {
      this._history.push(event);
    }
  }

  commit(): void {
    for (const event of this._history) {
      this.publish(event);
    }

    this._history.length = 0;
  }

  publish(event: Event): void {
    if (!this._eventBus) {
      throw new AggregateRootException('Unable to commit changes: the aggregate root is not connected to event bus');
    }

    this._eventBus.publish(event);
  }
}
