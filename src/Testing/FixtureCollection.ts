import {Fixture} from './Fixture';
import {Enumerable} from '../Core/Collections/Enumerable';


export class FixtureCollection extends Enumerable<Fixture> {
    public async createAll(): Promise<void> {
        await this.beforeCreate();

        for (let fixture of this) {
            await fixture.create();
        }

        await this.afterCreate();
    }


    public async destroyAll(): Promise<void> {
        await this.beforeDestroy();

        for (let fixture of this.toArray().reverse()) {
            if (fixture.isCreated) {
                await fixture.destroy();
            }
        }

        await this.afterDestroy();
    }


    protected async beforeCreate(): Promise<void> {
        // Stub
    }


    protected async afterCreate(): Promise<void> {
        // Stub
    }


    protected async beforeDestroy(): Promise<void> {
        // Stub
    }


    protected async afterDestroy(): Promise<void> {
        // Stub
    }
}
