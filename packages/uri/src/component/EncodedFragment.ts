import { Fragment } from './Fragment';

export class EncodedFragment extends Fragment {
  constructor(fragment?: string) {
    super(fragment && decodeURIComponent(fragment));
  }
}
