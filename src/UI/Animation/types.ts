

export type TimelineEventType   = 'start' | 'progress' | 'pause' | 'stop' | 'end' | 'change';
export type TransitionEventType = 'start' | 'progress' | 'pause' | 'stop' | 'end';


export enum EasingFunction {
    Linear, EaseIn, EaseOut, EaseInOut, EaseOutIn
}


export enum TimingFunction {
    Quad, Cubic, Quart, Quint, Expo, Sine, Circ, Elastic, Back, Bounce
}


export type TransitionFunction = (time: number, m?: number) => number;

