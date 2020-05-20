import { Subject } from 'rxjs';
import { Event } from './Event';

export class EventBus extends Subject<Event> {
  publish(event: Event) {
    this.next(event);
  }
}
