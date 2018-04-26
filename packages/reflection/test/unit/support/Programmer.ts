import {Set} from '@monument/collections/main/Set';
import {ListSet} from '@monument/collections/main/ListSet';
import {ReadOnlySet} from '@monument/collections/main/ReadOnlySet';
import {Example} from './decorators/Example';
import {Employee} from './Employee';


@Example
export class Programmer extends Employee {
    private readonly _programmingLanguages: Set<ProgrammingLanguage> = new ListSet();

    @Example
    public get programmingLanguages(): ReadOnlySet<ProgrammingLanguage> {
        return this._programmingLanguages;
    }


    public addProgrammingLanguages(...langs: ProgrammingLanguage[]): void {
        this._programmingLanguages.addAll(langs);
    }
}
