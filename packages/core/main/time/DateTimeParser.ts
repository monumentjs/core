import {ReadOnlyCollection} from '../collection/readonly/ReadOnlyCollection';
import {ReadOnlyMap} from '../collection/readonly/ReadOnlyMap';
import {DateTimeFormatInfo} from './DateTimeFormatInfo';
import {InvariantDateTimeFormatInfo} from './InvariantDateTimeFormatInfo';
import {DateTime} from './DateTime';
import {TimeEntryProcessorProvider} from './EntryProcessors/TimeEntryProcessorProvider';
import {TimeEntryProcessor} from './EntryProcessors/TimeEntryProcessor';
import {Singleton} from '../stereotype/Singleton';
import {TemplateString} from '../text/TemplateString';


@Singleton
export class DateTimeParser {
    private readonly _entryProcessorProvider: TimeEntryProcessorProvider;


    public constructor(entryProcessorProvider: TimeEntryProcessorProvider) {
        this._entryProcessorProvider = entryProcessorProvider;

    }


    public parse(
        source: string,
        format: string,
        formatInfo: DateTimeFormatInfo = InvariantDateTimeFormatInfo.INVARIANT
    ): DateTime {
        const template: TemplateString = new TemplateString(format);
        const formatEntries: ReadOnlyCollection<string> = template.uniqueEntries;
        const values: ReadOnlyMap<string, string> = template.extractValues(source);
        const builder: DateTime.Builder = new DateTime.Builder();

        for (const formatEntry of formatEntries) {
            const formatter: TimeEntryProcessor = this._entryProcessorProvider.getFormatter(formatEntry);
            const stringValue: string = values.get(formatEntry) as string;

            formatter.parseDateTime(stringValue, formatEntry, formatInfo, builder);
        }

        return builder.build();
    }
}
