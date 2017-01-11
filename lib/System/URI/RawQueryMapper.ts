import {IQueryMapper} from './types';


export default class RawQueryMapper<F> implements IQueryMapper<F> {
    public transform(rawQuery: F): F {
        return rawQuery;
    }
}

