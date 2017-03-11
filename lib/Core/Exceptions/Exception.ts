

export default class Exception extends Error {
    public readonly timeStamp: number = Date.now();
    public readonly helpInfo: string = '';
    public readonly helpLink: string = '';


    public constructor(message: string) {
        super(message);

        this.name = this.constructor.name;
    }


    public toString(): string {
        return `${this.constructor.name}: ${this.message}\n${this.stack}`;
    }
}

