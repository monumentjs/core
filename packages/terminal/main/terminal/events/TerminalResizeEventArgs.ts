import {EventArgs} from '@monument/core/main/events/EventArgs';
import {Size} from '@monument/geometry/main/base/Size';


export class TerminalResizeEventArgs extends EventArgs {
    public readonly oldSize: Size;
    public readonly newSize: Size;


    public constructor(oldSize: Size, newSize: Size) {
        super();
        this.oldSize = oldSize;
        this.newSize = newSize;
    }
}
