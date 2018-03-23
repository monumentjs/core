import {Cloneable} from '@monument/core/main/Cloneable';
import {ListSet} from '@monument/collections/main/ListSet';
import {Enumerable} from '@monument/collections-core/main/Enumerable';
import {TestCase} from '@monument/test-drive/main/base/TestCase';


export class TestConfiguration implements Cloneable<TestConfiguration> {
    private _description: string;
    private _testCases: ListSet<TestCase> = new ListSet();


    public get description(): string {
        return this._description;
    }


    public set description(value: string) {
        this._description = value;
    }


    public get testCases(): Enumerable<TestCase> {
        return this._testCases;
    }


    public constructor(description: string) {
        this._description = description;
    }


    public clone(): TestConfiguration {
        let test = new TestConfiguration(this.description);

        test._testCases = this._testCases.clone();

        return test;
    }
}
