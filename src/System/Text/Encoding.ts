import Sequence from '../../Core/Collections/Sequence';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';


export abstract class Encoding {
    public static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string {
        assertArgumentNotNull('originalString', originalString);
        assertArgumentNotNull('originalEncoding', originalEncoding);
        assertArgumentNotNull('targetEncoding', targetEncoding);

        let buffer: Buffer = originalEncoding.getBytes(originalString);

        return buffer.toString(targetEncoding.encodingName);
    }


    public readonly abstract encodingName: string;
    public readonly abstract webName: string;
    public readonly abstract maxCharacterSize: number;


    public getStringSize(stringLength: number): number {
        return stringLength * this.maxCharacterSize;
    }


    public getString(
        originalBuffer: Buffer,
        charOffset: number = 0,
        charCount?: number
    ): string {
        assertArgumentNotNull('originalBuffer', originalBuffer);
        assertArgumentNotNull('charOffset', charOffset);

        let originalText: string = originalBuffer.toString(this.encodingName);

        if (charCount == null) {
            charCount = originalText.length - charOffset;
        }

        Sequence.assertSliceBounds(originalText, charOffset, charCount);

        return originalText.substr(charOffset, charCount);
    }


    public getBytes(
        originalString: string,
        charsOffset: number = 0,
        charsCount: number = originalString.length - charsOffset
    ): Buffer {
        assertArgumentNotNull('originalString', originalString);
        assertArgumentNotNull('charsOffset', charsOffset);
        assertArgumentNotNull('charsCount', charsCount);

        Sequence.assertSliceBounds(originalString, charsOffset, charsCount);

        return Buffer.from(originalString, this.encodingName);
    }


    public getBytesCount(originalString: string): number {
        assertArgumentNotNull('originalString', originalString);

        return this.getBytes(originalString).length;
    }
}
