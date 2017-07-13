import { TimeComponentFormatterBase } from './Format/TimeComponentFormatterBase';
export declare class TimeComponentFormatterProvider {
    static readonly instance: TimeComponentFormatterProvider;
    private _formatters;
    getFormatter(formatEntry: string): TimeComponentFormatterBase | null;
}
