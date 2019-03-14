import { DefaultModel } from "../model/default_m";

export class EmptyControl {
    private readonly store: DefaultModel;

    constructor(parms: DefaultModel) {
        this.store = parms;
    }

    initData(search): Promise<{ list }> {
        return new Promise((resolve) => {
            this.store.getData().then((data) => {
                this.initEmpty(data, search)
                resolve();
            })
        });
    }

    initEmpty: (data, search) => Promise<any>;
}