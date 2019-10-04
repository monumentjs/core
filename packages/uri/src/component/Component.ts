import { ToJSON, ToString } from '@monument/core';

export interface Component<V, J = V> extends ToString, ToJSON<J> {
  readonly value: V;
  readonly isDefined: boolean;
}
