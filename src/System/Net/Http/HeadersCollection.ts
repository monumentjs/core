import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import InvalidArgumentException from '../../../Core/Exceptions/InvalidArgumentException';
import {STANDALONE_HTTP_HEADERS} from './constants';
import Collection from '../../../Core/Collections/Collection';
import Enumerable from '../../../Core/Collections/Enumerable';
import Header from './Header';
import List from '../../../Core/Collections/List';
import {IEqualityComparator} from '../../../Core/Collections/IEqualityComparator';
import {IteratorFunction} from '../../../Core/Collections/types';
import IgnoreCaseComparator from '../../../Core/Text/IgnoreCaseComparator';


export default class HeadersCollection extends Enumerable<Header> {
    private _headers: List<Header> = new List<Header>();
    private _nameComparator: IEqualityComparator<string>;


    public get nameComparator(): IEqualityComparator<string> {
        return this._nameComparator;
    }


    public constructor(
        nameComparator: IEqualityComparator<string> = IgnoreCaseComparator.instance
    ) {
        super();

        assertArgumentNotNull('nameComparator', nameComparator);

        this._nameComparator = nameComparator;

    }


    public set(headerName: string, headerValue: string): void {
        let newHeader: Header = new Header(headerName, headerValue);

        if (STANDALONE_HTTP_HEADERS.contains(newHeader.name, this.nameComparator)) {
            this._headers.removeBy((header: Header): boolean => {
                return this.nameComparator.equals(header.name, newHeader.name);
            });
        }

        this._headers.add(newHeader);
    }


    public getNames(): Collection<string> {
        let allNames: List<string> = this._headers.select((header: Header): string => {
            return header.name;
        });

        let uniqueNames: List<string> = allNames.distinct(this.nameComparator);

        return  uniqueNames.toCollection();
    }


    public find(headerName: string): string {
        let foundHeader: Header = this._headers.first(this.getSelector(headerName));

        if (foundHeader) {
            return foundHeader.value;
        }

        return null;
    }


    public findAll(headerName: string): Collection<string> {
        let foundHeaders: List<Header> = this._headers.where(this.getSelector(headerName));

        let values: List<string> = foundHeaders.select((header: Header): string => {
            return header.value;
        });

        return values.toCollection();
    }


    public remove(headerName: string): void {
        this._headers.removeBy(this.getSelector(headerName));
    }


    public contains(headerName: string): boolean {
        return this._headers.any(this.getSelector(headerName));
    }


    public getIterator(): Iterator<Header> {
        return this._headers.getIterator();
    }


    private getSelector(headerName: string): IteratorFunction<Header, boolean> {
        assertArgumentNotNull('headerName', headerName);

        if (headerName.length === 0) {
            throw new InvalidArgumentException(`Header name cannot be empty.`);
        }

        return (header: Header): boolean => {
            return this.nameComparator.equals(header.name, headerName);
        };
    }
}
