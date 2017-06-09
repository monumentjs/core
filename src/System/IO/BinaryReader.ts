import {Stream} from '../Stream/Stream';
import {assertArgumentNotNull} from '../../Core/Assertion/Assert';
import {ByteOrder} from './ByteOrder';


export class BinaryReader {
    private _baseStream: Stream<Buffer>;


    public get baseStream(): Stream<Buffer> {
        return this._baseStream;
    }


    public constructor(baseStream: Stream<Buffer>) {
        assertArgumentNotNull('baseStream', baseStream);

        this._baseStream = baseStream;
    }


    public async read(bytesCount: number): Promise<Buffer> {
        assertArgumentNotNull('bytesCount', bytesCount);

        return this._baseStream.read(bytesCount);
    }


    public async readUInt(byteOrder: ByteOrder, bytesCount: number): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);
        assertArgumentNotNull('bytesCount', bytesCount);

        let buffer: Buffer = await this.read(bytesCount);

        if (byteOrder === ByteOrder.BigEndian) {
            return buffer.readUIntBE(0, bytesCount);
        } else {
            return buffer.readUIntLE(0, bytesCount);
        }
    }


    public async readInt(byteOrder: ByteOrder, bytesCount: number): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);
        assertArgumentNotNull('bytesCount', bytesCount);

        let buffer: Buffer = await this.read(bytesCount);

        if (byteOrder === ByteOrder.BigEndian) {
            return buffer.readIntBE(0, bytesCount);
        } else {
            return buffer.readIntLE(0, bytesCount);
        }
    }


    public async readFloat(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        let buffer: Buffer = await this.read(4);

        if (byteOrder === ByteOrder.BigEndian) {
            return buffer.readFloatBE(0);
        } else {
            return buffer.readFloatLE(0);
        }
    }


    public async readDouble(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        let buffer: Buffer = await this.read(8);

        if (byteOrder === ByteOrder.BigEndian) {
            return buffer.readDoubleBE(0);
        } else {
            return buffer.readDoubleLE(0);
        }
    }


    public async readUInt8(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readUInt(byteOrder, 1);
    }


    public async readUInt16(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readUInt(byteOrder, 2);
    }


    public async readUInt24(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readUInt(byteOrder, 3);
    }


    public async readUInt32(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readUInt(byteOrder, 4);
    }


    public async readInt8(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readInt(byteOrder, 1);
    }


    public async readInt16(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readInt(byteOrder, 2);
    }


    public async readInt24(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readInt(byteOrder, 3);
    }


    public async readInt32(byteOrder: ByteOrder): Promise<number> {
        assertArgumentNotNull('byteOrder', byteOrder);

        return this.readInt(byteOrder, 4);
    }
}
