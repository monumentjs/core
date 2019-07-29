import { EMPTY_STRING, LinkedMap, TemplateString } from '@monument/core';
import { Layout } from './Layout';
import { Level } from '../core/Level';
import { LogEvent } from '../core/LogEvent';

/**
 * Represents layout which serialize log event message to formatted string.
 * @since 0.0.1
 * @author Alex Chugaev
 * @see Layout
 */
export class StringLayout implements Layout {
  private readonly _template: TemplateString;

  readonly header: string;

  readonly footer: string;

  constructor(template: string, header: string = EMPTY_STRING, footer: string = EMPTY_STRING) {
    this.footer = footer;
    this.header = header;
    this._template = new TemplateString(template);
  }

  serialize(event: LogEvent): string {
    const keys: LinkedMap<string, string> = new LinkedMap();

    keys.put('name', event.name);
    keys.put('message', event.message);
    keys.put('level', Level[event.level]);
    keys.put('timestamp', new Date(event.timestamp).toString());

    if (event.error) {
      keys.put('errorMessage', event.error.message);
      keys.put('errorStack', event.error.stack || EMPTY_STRING);
    }

    return this._template.fillByKeys(keys);
  }
}
