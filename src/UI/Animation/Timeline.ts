import Helpers from './helpers';
import EventEmitter from '../../Core/Events/EventEmitter';
import TimelineEvent from './TimelineEvent';
import {TimelineEventType} from './types';


const {requestAnimationFrame, cancelAnimationFrame} = Helpers;


export default class Timeline extends EventEmitter {
    private _originalDuration: number;
    private _duration: number;
    private _position: number;
    private _isSeeking: boolean;
    private _animationId: number;
    private _lastTimestamp: number;
    
    
    get originalDuration(): number {
        return this._originalDuration;
    }


    get duration(): number {
        return this._duration;
    }


    set duration(duration: number) {
        this._duration = duration;

        if (this._position < duration) {
            this._position = duration;
        }

        this.notify(TimelineEvent.CHANGE);
    }

 
    get position(): number {
        return this._position;
    }

 
    set position(newValue: number) {
        this._position = newValue;
    }

  
    get isSeeking(): boolean {
        return this._isSeeking;
    }


    constructor(duration: number = 1000) {
        super();
        this._animationId = null;
        this._duration = duration;
        this._originalDuration = duration;
        this._position = -1;
        this._isSeeking = false;
    }


    public play(restart: boolean = false) {
        this._isSeeking = true;

        if (restart) {
            this._position = -1;
        }

        this.updateAnimation();
    }


    public pause() {
        this._isSeeking = false;
        this.notify(TimelineEvent.PAUSE);
        this.updateAnimation();
    }


    public stop() {
        this._isSeeking = false;
        this._position = -1;
        this.notify(TimelineEvent.STOP);
        this.updateAnimation();
    }


    protected updateAnimation() {
        cancelAnimationFrame(this._animationId);

        if (!this._isSeeking) {
            return;
        }

        if (this._position < 0) {
            this.notify(TimelineEvent.START);
            this._position = 0;
        }

        this._lastTimestamp = Date.now();

        this.nextTick();
    }
    
    
    protected notify(event: TimelineEventType) {
        this.dispatchEvent(new TimelineEvent(event, this._position, this._duration));
    }


    protected nextTick() {
        this._animationId = requestAnimationFrame(() => {
            this.onAnimationTick();
        });
    }


    protected onAnimationTick() {
        let isLastTick: boolean;

        this._position = Date.now() - this._lastTimestamp;

        if (this._position > this._duration) {
            this._position = this._duration;
        }

        isLastTick = this._position >= this._duration;

        if (isLastTick) {
            this._position = this._duration;
        }

        this.notify(TimelineEvent.PROGRESS);

        if (this._position >= this._duration) {
            this.notify(TimelineEvent.END);
        } else {
            this.nextTick();
        }
    }
}