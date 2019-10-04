import { Query } from './Query';

export class EncodedQuery extends Query {

  constructor(source?: string) {
    if (source != null) {
      super(
        source.split('&')
          .map(item => item.split('=', 2))
          .filter(pair => pair[1] != null)
          .map(([name, value]) => [
            decodeURIComponent(name),
            decodeURIComponent(value)
          ])
      );
    } else {
      super();
    }
  }
}
