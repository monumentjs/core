import {Fixture} from './Fixture';
import {AsyncResult} from '../Core/types';
import {Enumerable} from '../Core/Collections/Enumerable';


export class FixtureCollection extends Enumerable<Fixture> {
    public async createAll(): AsyncResult<void> {
        await this.beforeCreate();

        for (let fixture of this) {
            await fixture.create();
        }

        await this.afterCreate();
    }


    public async destroyAll(): AsyncResult<void> {
        await this.beforeDestroy();

        for (let fixture of this.toArray().reverse()) {
            if (fixture.isCreated) {
                await fixture.destroy();
            }
        }

        await this.afterDestroy();
    }


    protected async beforeCreate(): AsyncResult<void> {
        // Stub
    }


    protected async afterCreate(): AsyncResult<void> {
        // Stub
    }


    protected async beforeDestroy(): AsyncResult<void> {
        // Stub
    }


    protected async afterDestroy(): AsyncResult<void> {
        // Stub
    }
}
