import { ToString } from '@monument/core';
import { Printable } from '@monument/text';

export interface Component extends ToString, Printable<ToString> {
  readonly present: boolean;
}
