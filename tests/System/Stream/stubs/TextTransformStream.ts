import Stream from '../../../../lib/System/Stream/Stream';
import {AsyncResult} from '../../../../lib/Core/types';


export default class TextTransformStream extends Stream<string> {
    public static toLowerCase(): TextTransformStream {
        return new TextTransformStream(String.prototype.toLowerCase);
    }


    public static toUpperCase(): TextTransformStream {
        return new TextTransformStream(String.prototype.toUpperCase);
    }


    private _transformFunction: Function;


    protected constructor(transformFunction: Function) {
        super();
        this._transformFunction = transformFunction;
    }


    public async write(chunk: string): AsyncResult<void> {
        await super.write(this._transformFunction.call(chunk));
    }
}
