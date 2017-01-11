import {IQueryMapper} from '../../../../lib/System/URI/types';
import {SearchQuery} from './types';


export default class SearchQueryMapper implements IQueryMapper<SearchQuery> {
    private _defaultLimit: number;


    constructor(defaultLimit: number = 10) {
        this._defaultLimit = defaultLimit;
    }


    public transform(rawQuery: any): SearchQuery {
        let query: SearchQuery = Object.create(null);
        let page: number = parseInt(rawQuery.page, 10);
        let limit: number = parseInt(rawQuery.limit, 10);

        if (isNaN(page)) {
            page = 1;
        }

        if (isNaN(limit)) {
            limit = this._defaultLimit;
        }

        query.q = rawQuery.q;
        query.page = page;
        query.limit = limit;

        return query;
    }
}
