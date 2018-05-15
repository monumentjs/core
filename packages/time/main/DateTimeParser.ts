import {GetInstance} from '@monument/core/main/decorators/GetInstance';
import {ReadOnlyCollection} from '@monument/collections/main/ReadOnlyCollection';
import {ReadOnlyMap} from '@monument/collections/main/ReadOnlyMap';
import {TemplateString} from '@monument/text/main/TemplateString';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {InvariantDateTimeFormatInfo} from './InvariantDateTimeFormatInfo';
import {DateTime} from './DateTime';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';
import {TimeEntryProcessor} from './EntryProcessors/TimeEntryProcessor';


export class DateTimeParser {
    @GetInstance()
    public static readonly instance: DateTimeParser;


    private constructor() {}


    public parse(
        source: string,
        format: string,
        formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.invariant
    ): DateTime {
        const template: TemplateString = new TemplateString(format);
        const formatEntries: ReadOnlyCollection<string> = template.uniqueEntries;
        const values: ReadOnlyMap<string, string> = template.extractValues(source);
        const builder: DateTime.Builder = new DateTime.Builder();

        for (const formatEntry of formatEntries) {
            const formatter: TimeEntryProcessor = TimeEntryProcessorProvider.instance.getFormatter(formatEntry);
            const stringValue: string = values.get(formatEntry) as string;

            formatter.parseDateTime(stringValue, formatEntry, formatInfo, builder);
        }

        return builder.build();
    }
}
