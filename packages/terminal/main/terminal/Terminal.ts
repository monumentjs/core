import {WriteStream} from 'tty';
import {Component} from '@monument/core/main/stereotype/Component';
import {Event} from '@monument/core/main/events/Event';
import {ConfigurableEvent} from '@monument/core/main/events/ConfigurableEvent';
import {Size} from '@monument/geometry/main/base/Size';
import {TerminalResizeEventArgs} from './events/TerminalResizeEventArgs';


@Component
export class Terminal {
    public static readonly MIN_WIDTH = 1;
    public static readonly MIN_HEIGHT = 1;

    private readonly _resized: ConfigurableEvent<this, TerminalResizeEventArgs> = new ConfigurableEvent();
    private readonly _process: NodeJS.Process = process;
    private readonly _stdout: WriteStream = process.stdout as WriteStream;
    private _size: Size;


    public get resized(): Event<this, TerminalResizeEventArgs> {
        return this._resized;
    }


    public get size(): Size {
        return this._size;
    }


    public constructor() {
        this._size = new Size(
            this._stdout.columns || Terminal.MIN_WIDTH,
            this._stdout.rows || Terminal.MIN_HEIGHT
        );

        this._stdout.on('resize', () => {
            const oldSize = this._size;
            const newSize: Size = new Size(
                this._stdout.columns || Terminal.MIN_WIDTH,
                this._stdout.rows || Terminal.MIN_HEIGHT
            );

            this._size = newSize;

            this._resized.trigger(this, new TerminalResizeEventArgs(oldSize, newSize));
        });
    }


    public writeBytes(bytes: Buffer): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._stdout.write(bytes, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }


    public writeText(text: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this._stdout.write(text, (error: Error) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            });
        });
    }
}
