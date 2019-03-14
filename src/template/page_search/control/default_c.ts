import { DefaultModel } from "../model/default_m";

export class DefaultControl {
    private readonly store: DefaultModel;

    constructor(parms: DefaultModel) {
        this.store = parms;
    }

    initData(index): Promise<any> {
        return new Promise((resolve) => {
            this.store.getData().then((data) => {
                this.initDefault(data, index)
                resolve();
            })
        });
    }

    initDefault: (data, index) => Promise<any>;
}