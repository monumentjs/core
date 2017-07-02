import {Assert} from '../../Core/Assertion/Assert';


export abstract class Encoding {
    public static convert(originalString: string, originalEncoding: Encoding, targetEncoding: Encoding): string {
        Assert.argument('originalString', originalString).notNull();
        Assert.argument('originalEncoding', originalEncoding).notNull();
        Assert.argument('targetEncoding', targetEncoding).notNull();

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
        Assert.argument('originalBuffer', originalBuffer).notNull();
        Assert.argument('charOffset', charOffset).notNull();

        let originalString: string = originalBuffer.toString(this.encodingName);

        if (charCount == null) {
            charCount = originalString.length - charOffset;
        }

        Assert.sequence(originalString).containsSlice(charOffset, charCount);

        return originalString.substr(charOffset, charCount);
    }


    public getBytes(
        originalString: string,
        charOffset: number = 0,
        charCount: number = originalString.length - charOffset
    ): Buffer {
        Assert.argument('originalString', originalString).notNull();
        Assert.argument('charOffset', charOffset).notNull();
        Assert.argument('charCount', charCount).notNull();

        Assert.sequence(originalString).containsSlice(charOffset, charCount);

        return Buffer.from(originalString, this.encodingName);
    }


    public getBytesCount(originalString: string): number {
        Assert.argument('originalString', originalString).notNull();

        return this.getBytes(originalString).length;
    }
}
