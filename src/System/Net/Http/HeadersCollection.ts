import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';
import {InvalidArgumentException} from '../../../Core/Exceptions/InvalidArgumentException';
import {STANDALONE_HTTP_HEADERS} from './constants';
import {Collection} from '../../../Core/Collections/Collection';
import {Enumerable} from '../../../Core/Collections/Enumerable';
import {Header} from './Header';
import {List} from '../../../Core/Collections/List';
import {IEqualityComparator} from '../../../Core/Collections/IEqualityComparator';
import {IteratorFunction} from '../../../Core/Collections/types';
import {IgnoreCaseComparator} from '../../../Core/Text/IgnoreCaseComparator';


export class HeadersCollection
    extends
        Enumerable<Header> {

    private _nameComparator: IEqualityComparator<string>;


    public get nameComparator(): IEqualityComparator<string> {
        return this._nameComparator;
    }


    public constructor(nameComparator: IEqualityComparator<string> = IgnoreCaseComparator.instance) {
        super();

        assertArgumentNotNull('nameComparator', nameComparator);

        this._nameComparator = nameComparator;
    }


    public set(headerName: string, headerValue: string): void {
        this.assertHeaderNameNotEmpty(headerName);
        assertArgumentNotNull('headerValue', headerValue);

        let newHeader: Header = new Header(headerName, headerValue);

        if (STANDALONE_HTTP_HEADERS.contains(newHeader.name, this.nameComparator)) {
            List.prototype.removeBy.call(this, (header: Header): boolean => {
                return this.nameComparator.equals(header.name, newHeader.name);
            });
        }

        List.prototype.add.call(this, newHeader);
    }


    public getNames(): Collection<string> {
        let allNames: List<string> = List.prototype.select.call(this, (header: Header): string => {
            return header.name;
        });

        let uniqueNames: List<string> = allNames.distinct(this.nameComparator);

        return  uniqueNames.toCollection();
    }


    public find(headerName: string): string {
        this.assertHeaderNameNotEmpty(headerName);

        let foundHeader: Header = List.prototype.first.call(this, this.getSelector(headerName));

        if (foundHeader) {
            return foundHeader.value;
        }

        return null;
    }


    public findAll(headerName: string): Collection<string> {
        this.assertHeaderNameNotEmpty(headerName);

        let foundHeaders: List<Header> = List.prototype.where.call(this, this.getSelector(headerName));

        let values: List<string> = foundHeaders.select((header: Header): string => {
            return header.value;
        });

        return values.toCollection();
    }


    public remove(headerName: string): void {
        this.assertHeaderNameNotEmpty(headerName);

        List.prototype.removeBy.call(this, this.getSelector(headerName));
    }


    public contains(headerName: string): boolean {
        this.assertHeaderNameNotEmpty(headerName);

        return List.prototype.any.call(this, this.getSelector(headerName));
    }


    private getSelector(headerName: string): IteratorFunction<Header, boolean> {
        this.assertHeaderNameNotEmpty(headerName);

        return (header: Header): boolean => {
            return this.nameComparator.equals(header.name, headerName);
        };
    }


    private assertHeaderNameNotEmpty(headerName: string): void {
        assertArgumentNotNull('headerName', headerName);

        if (headerName.length === 0) {
            throw new InvalidArgumentException(`Header name cannot be empty.`);
        }
    }
}
