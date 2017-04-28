import {Pool} from '../../Core/types';
import {TransitionFunction, TimingFunction, EasingFunction} from './types';


export class EasingFactory {
    private _eases: Pool<TransitionFunction>;


    // TODO: Refactor easing functions constructor. It should be more understandable.
    public constructor() {
        let eases: Pool<TransitionFunction> = {};
        let names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
        let functions = {
            Sine: function (time: number): number {
                return 1 - Math.cos(time * Math.PI / 2);
            },
            Circ: function (time: number): number {
                return 1 - Math.sqrt(1 - time * time);
            },
            Elastic: function (time: number, m: number): number {
                if (time === 0 || time === 1) {
                    return time;
                }

                let p = (1 - Math.min(m, 998) / 1000);
                let st1 = time - 1;
                let s = p / (2 * Math.PI) * Math.asin(1);

                return -(Math.pow(2, 10 * st1) * Math.sin((st1 - s) * (2 * Math.PI) / p));
            },
            Back: function (time: number): number {
                return time * time * (3 * time - 2);
            },
            Bounce: function (time: number): number {
                let pow2;
                let bounce = 4;

                do {
                    pow2 = Math.pow(2, --bounce);
                } while (time < ((pow2) - 1) / 11);

                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - time, 2);
            }
        };

        names.forEach(function (name: string, index: number) {
            functions[name] = function (t: number): number {
                return Math.pow(t, index + 2);
            };
        });

        Object.keys(functions).forEach(function (name) {
            let easeIn: TransitionFunction = functions[name];

            eases['EaseIn' + name] = easeIn;
            eases['EaseOut' + name] = function (t: number, m: number): number {
                return 1 - easeIn(1 - t, m);
            };
            eases['EaseInOut' + name] = function (t: number, m: number): number {
                return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2;
            };
            eases['EaseOutIn' + name] = function (t: number, m: number): number {
                return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2;
            };
        });

        eases['Linear'] = function (t: number) {
            return t;
        };

        this._eases = eases;
    }


    public create(easingFunction: EasingFunction, timingFunction: TimingFunction): TransitionFunction {
        let name: string = EasingFunction[easingFunction] + TimingFunction[timingFunction];

        if (name in this._eases) {
            return this._eases[name];
        } else {
            return this._eases['Linear'];
        }
    }
}
