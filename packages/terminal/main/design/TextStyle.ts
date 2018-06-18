import {Style} from './Style';


export class TextStyle extends Style {
    public static readonly RESET: TextStyle = new TextStyle(0, 0);
    public static readonly BOLD: TextStyle = new TextStyle(1, 22);
    public static readonly DIM: TextStyle = new TextStyle(2, 22);
    public static readonly ITALIC: TextStyle = new TextStyle(3, 23);
    public static readonly UNDERLINE: TextStyle = new TextStyle(4, 24);
    public static readonly INVERSE: TextStyle = new TextStyle(7, 27);
    public static readonly HIDDEN: TextStyle = new TextStyle(8, 28);
    public static readonly STRIKE_THROUGH: TextStyle = new TextStyle(9, 29);
}
