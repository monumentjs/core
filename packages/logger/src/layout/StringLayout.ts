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

  constructor(template: string, readonly header: string = EMPTY_STRING, readonly footer: string = EMPTY_STRING) {
    this._template = new TemplateString(template);
  }

  serialize(action: LogEvent): string {
    const keys: LinkedMap<string, string> = new LinkedMap();

    keys.put('name', action.name);
    keys.put('message', action.message);
    keys.put('level', Level[action.level]);
    keys.put('timestamp', new Date(action.timestamp).toString());

    if (action.error) {
      keys.put('errorMessage', action.error.message);
      keys.put('errorStack', action.error.stack || EMPTY_STRING);
    }

    return this._template.fillByKeys(keys);
  }
}
