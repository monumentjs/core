import { IQueryMapper } from './types';
export default class RawQueryMapper<F> implements IQueryMapper<F> {
    transform(rawQuery: F): F;
}
