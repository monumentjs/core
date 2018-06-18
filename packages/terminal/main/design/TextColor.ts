import {Style} from './Style';


export class TextColor extends Style {
    public static readonly BLACK: TextColor = new TextColor(30, 39);
    public static readonly RED: TextColor = new TextColor(31, 39);
    public static readonly GREEN: TextColor = new TextColor(32, 39);
    public static readonly YELLOW: TextColor = new TextColor(33, 39);
    public static readonly BLUE: TextColor = new TextColor(34, 39);
    public static readonly MAGENTA: TextColor = new TextColor(35, 39);
    public static readonly CYAN: TextColor = new TextColor(36, 39);
    public static readonly WHITE: TextColor = new TextColor(37, 39);
    public static readonly GRAY: TextColor = new TextColor(90, 39);

    public static readonly RED_BRIGHT: TextColor = new TextColor(91, 39);
    public static readonly GREEN_BRIGHT: TextColor = new TextColor(92, 39);
    public static readonly YELLOW_BRIGHT: TextColor = new TextColor(93, 39);
    public static readonly BLUE_BRIGHT: TextColor = new TextColor(94, 39);
    public static readonly MAGENTA_BRIGHT: TextColor = new TextColor(95, 39);
    public static readonly CYAN_BRIGHT: TextColor = new TextColor(96, 39);
    public static readonly WHITE_BRIGHT: TextColor = new TextColor(97, 39);
}
