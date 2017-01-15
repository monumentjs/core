export declare type TimelineEventType = 'start' | 'progress' | 'pause' | 'stop' | 'end' | 'change';
export declare type TransitionEventType = 'start' | 'progress' | 'pause' | 'stop' | 'end';
export declare enum EasingFunction {
    Linear = 0,
    EaseIn = 1,
    EaseOut = 2,
    EaseInOut = 3,
    EaseOutIn = 4,
}
export declare enum TimingFunction {
    Quad = 0,
    Cubic = 1,
    Quart = 2,
    Quint = 3,
    Expo = 4,
    Sine = 5,
    Circ = 6,
    Elastic = 7,
    Back = 8,
    Bounce = 9,
}
export interface IEasingFunction {
    (time: number, m?: number): number;
}
