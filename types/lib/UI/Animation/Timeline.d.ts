import EventEmitter from '../../Core/Events/EventEmitter';
import { TimelineEventType } from './types';
export default class Timeline extends EventEmitter {
    private _originalDuration;
    private _duration;
    private _position;
    private _isSeeking;
    private _animationId;
    private _lastTimestamp;
    readonly originalDuration: number;
    duration: number;
    position: number;
    readonly isSeeking: boolean;
    constructor(duration?: number);
    play(restart?: boolean): void;
    pause(): void;
    stop(): void;
    protected updateAnimation(): void;
    protected notify(event: TimelineEventType): void;
    protected nextTick(): void;
    protected onAnimationTick(): void;
}
