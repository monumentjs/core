import {Pool, IFactory} from '../../Core/types';
import {IEasingFunction, TimingFunction, EasingFunction} from './types';


export default class EasingFactory implements IFactory<IEasingFunction> {
    private _eases: Pool<IEasingFunction>;


    // TODO: Refactor easing functions constructor. It should be more understandable.
    constructor() {
        let eases: Pool<IEasingFunction> = {};
        let names = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];
        let functions = {
            Sine: function(t: number): number {
                return 1 - Math.cos(t * Math.PI / 2);
            },
            Circ: function(t: number): number {
                return 1 - Math.sqrt(1 - t * t);
            },
            Elastic: function(t: number, m: number): number {
                if (t === 0 || t === 1) {
                    return t;
                }

                let p = (1 - Math.min(m, 998) / 1000);
                let st = t / 1;
                let st1 = st - 1;
                let s = p / (2 * Math.PI) * Math.asin(1);

                return -(Math.pow(2, 10 * st1) * Math.sin((st1 - s) * (2 * Math.PI) / p));
            },
            Back: function(t: number): number {
                return t * t * (3 * t - 2);
            },
            Bounce: function(t: number): number {
                let pow2;
                let bounce = 4;

                while (t < ((pow2 = Math.pow(2, --bounce)) - 1) / 11) {

                }

                return 1 / Math.pow(4, 3 - bounce) - 7.5625 * Math.pow((pow2 * 3 - 2) / 22 - t, 2);
            }
        };

        names.forEach(function(name: string, i: number) {
            functions[name] = function(t: number): number {
                return Math.pow(t, i + 2);
            };
        });

        Object.keys(functions).forEach(function(name) {
            let easeIn: IEasingFunction = functions[name];

            eases['EaseIn' + name] = easeIn;
            eases['EaseOut' + name] = function(t: number, m: number): number {
                return 1 - easeIn(1 - t, m);
            };
            eases['EaseInOut' + name] = function(t: number, m: number): number {
                return t < 0.5 ? easeIn(t * 2, m) / 2 : 1 - easeIn(t * -2 + 2, m) / 2;
            };
            eases['EaseOutIn' + name] = function(t: number, m: number): number {
                return t < 0.5 ? (1 - easeIn(1 - 2 * t, m)) / 2 : (easeIn(t * 2 - 1, m) + 1) / 2;
            };
        });

        eases['Linear'] = function(t: number) {
            return t;
        };

        this._eases = eases;
    }


    public create(easingFunction: EasingFunction, timingFunction: TimingFunction): IEasingFunction {
        let name: string = EasingFunction[easingFunction] + TimingFunction[timingFunction];

        if (name in this._eases) {
            return this._eases[name];
        } else {
            return this._eases['Linear'];
        }
    }
}
