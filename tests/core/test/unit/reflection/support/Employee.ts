import {Example} from './decorators/Example';
import {Department} from './Department';


@Example
export class Employee {
    private _name: string;
    private _salary: number;
    private _department: Department;


    @Example
    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        this._name = value;
    }


    @Example
    public get salary(): number {
        return this._salary;
    }


    public set salary(value: number) {
        this._salary = value;
    }


    @Example
    public get department(): Department {
        return this._department;
    }


    public set department(value: Department) {
        this._department = value;
    }


    public constructor(name: string, salary: number, department: Department) {
        this._name = name;
        this._salary = salary;
        this._department = department;
    }
}
