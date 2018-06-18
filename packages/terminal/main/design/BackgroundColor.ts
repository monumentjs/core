import {Style} from './Style';


export class BackgroundColor extends Style {
    public static readonly BLACK: BackgroundColor = new BackgroundColor(40, 49);
    public static readonly RED: BackgroundColor = new BackgroundColor(41, 49);
    public static readonly GREEN: BackgroundColor = new BackgroundColor(42, 49);
    public static readonly YELLOW: BackgroundColor = new BackgroundColor(43, 49);
    public static readonly BLUE: BackgroundColor = new BackgroundColor(44, 49);
    public static readonly MAGENTA: BackgroundColor = new BackgroundColor(45, 49);
    public static readonly CYAN: BackgroundColor = new BackgroundColor(46, 49);
    public static readonly WHITE: BackgroundColor = new BackgroundColor(47, 49);
}
