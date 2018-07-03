import {Theme} from './Theme';
import {TextStyle} from './TextStyle';
import {TextColor} from './TextColor';


export class Themes {
    public static readonly SUCCESS_LABEL = new Theme(TextColor.GREEN, TextStyle.BOLD);
    public static readonly ERROR_LABEL = new Theme(TextColor.RED, TextStyle.BOLD);
    public static readonly WARNING_LABEL = new Theme(TextColor.YELLOW, TextStyle.BOLD);

    public static readonly SUCCESS_TEXT = new Theme(TextColor.GREEN);
    public static readonly ERROR_TEXT = new Theme(TextColor.RED);
    public static readonly WARNING_TEXT = new Theme(TextColor.YELLOW);
    public static readonly SECONDARY_TEXT = new Theme(TextColor.GRAY);

    public static readonly HEADING = new Theme(TextStyle.BOLD);

    public static readonly CONTROL = new Theme(TextColor.CYAN, TextStyle.BOLD);

}
