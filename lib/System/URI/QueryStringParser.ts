import {ICustomParser} from '../../Core/types';
import {IQueryMapper} from './types';
import RawQueryMapper from './RawQueryMapper';


export default class QueryStringParser<F> implements ICustomParser<F> {
    private _mapper: IQueryMapper<F>;


    constructor(mapper: IQueryMapper<F> = new RawQueryMapper<F>()) {
        this._mapper = mapper;
    }


    public parse(queryString: string): F {
        let pairs = queryString.split('&');
        let rawQuery: any = pairs.reduce((hash: F, pair: string) => {
            let [key, value] = pair.split('=');

            if (key) {
                hash[key] = value;
            }

            return hash;
        }, Object.create(null));

        return this._mapper.transform(rawQuery);
    }
}
