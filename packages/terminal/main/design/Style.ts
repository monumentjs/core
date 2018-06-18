import {Rule} from './Rule';


export class Style implements Rule {
    private static readonly PREFIX = '\u001b[';
    private static readonly SUFFIX = 'm';

    private readonly _open: string;
    private readonly _close: string;


    protected constructor(openCode: number, closeCode: number) {
        this._open = Style.PREFIX + openCode + Style.SUFFIX;
        this._close = Style.PREFIX + closeCode + Style.SUFFIX;
    }


    public apply(text: string): string {
        return `${this._open}${text}${this._close}`;
    }
}
