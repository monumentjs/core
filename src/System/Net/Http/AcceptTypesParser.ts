import {AcceptTypesCollection} from './AcceptTypesCollection';
import {assertArgumentNotNull} from '../../../Core/Assertion/Assert';


const SEGMENTS_DELIMITER: RegExp = /[;,]+/g;
const PRIORITY_MARKER: string = 'q=';

// text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8

export class AcceptTypesParser {
    public static readonly instance: AcceptTypesParser = new AcceptTypesParser();


    public parse(value: string): AcceptTypesCollection {
        assertArgumentNotNull('value', value);

        let acceptTypes: AcceptTypesCollection = new AcceptTypesCollection();
        let segments: string[] = this.getValueSegments(value);
        let mimeTypes: string[] = [];

        for (let segment of segments) {
            if (this.hasPriorityMarker(segment)) {
                let priority: number = this.getPriority(segment);

                for (let mimeType of mimeTypes) {
                    acceptTypes.addType(mimeType, priority);
                }

                mimeTypes = [];
            } else {
                mimeTypes.push(segment);
            }
        }

        return acceptTypes;
    }


    private getValueSegments(value: string): string[] {
        return value.split(SEGMENTS_DELIMITER);
    }


    private hasPriorityMarker(segment: string): boolean {
        return segment.startsWith(PRIORITY_MARKER);
    }


    private getPriority(segment: string): number {
        return parseFloat(segment.substr(PRIORITY_MARKER.length));
    }
}
