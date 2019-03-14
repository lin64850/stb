import { DefaultModel } from "../model/default_m";

export class EmptyControl {
    private readonly store: DefaultModel;

    constructor(parms: DefaultModel) {
        this.store = parms;
    }

    initData(index): Promise<{ list }> {
        return new Promise((resolve) => {
            this.store.getData().then((data) => {
                this.initEmpty(data, index)
                resolve();
            })
        });
    }

    initEmpty: (data, index) => Promise<any>;
}