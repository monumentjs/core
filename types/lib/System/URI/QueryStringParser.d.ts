import { ICustomParser } from '../../Core/types';
import { IQueryMapper } from './types';
export default class QueryStringParser<F> implements ICustomParser<F> {
    private _mapper;
    constructor(mapper?: IQueryMapper<F>);
    parse(queryString: string): F;
}
