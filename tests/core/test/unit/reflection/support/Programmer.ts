import {Example} from './decorators/Example';
import {Employee} from './Employee';
import {ListSet} from '@monument/core/main/collection/mutable/ListSet';
import {ReadOnlySet} from '@monument/core/main/collection/readonly/ReadOnlySet';
import {Set} from '@monument/core/main/collection/mutable/Set';


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
