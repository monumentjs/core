

export class Department {
    private _name: string;

    public get name(): string {
        return this._name;
    }


    public set name(value: string) {
        this._name = value;
    }


    public constructor(name: string) {
        this._name = name;
    }
}
