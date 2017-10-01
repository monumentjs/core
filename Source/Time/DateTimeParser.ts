import {GetInstance} from '../Language/Decorators/GetInstance';
import {Service} from '../DI/Decorators/Service';
import {IDateTimeFormatInfo} from './IDateTimeFormatInfo';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {DateTime} from './DateTime';
import {FormattableString} from '../Text/FormattableString';
import {IReadOnlyCollection} from '../Collections/Abstraction/IReadOnlyCollection';
import {DateTimeBuilder} from './DateTimeBuilder';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';
import {TimeEntryProcessor} from './EntryProcessors/TimeEntryProcessor';
import {Map} from '../Collections/Map';


@Service()
export class DateTimeParser {
    @GetInstance()
    public static readonly instance: DateTimeParser;


    private constructor() {}


    public parse(
        source: string,
        format: string,
        formatInfo: IDateTimeFormatInfo = DateTimeFormatInfo.invariant
    ): DateTime {
        const template: FormattableString = new FormattableString(format);
        const formatEntries: IReadOnlyCollection<string> = template.uniqueEntries;
        const values: Map<string, string> = template.extractValues(source);
        const builder: DateTimeBuilder = new DateTimeBuilder();

        for (let formatEntry of formatEntries) {
            const formatter: TimeEntryProcessor = TimeEntryProcessorProvider.instance.getFormatter(formatEntry);
            const stringValue: string = values.get(formatEntry) as string;

            formatter.parseDateTime(stringValue, formatEntry, formatInfo, builder);
        }

        return builder.getValue();
    }
}
