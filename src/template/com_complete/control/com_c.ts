import { IndexModel } from "../model/index_m";

export class IndexControl {
    private readonly store: IndexModel;

    // other children model

    // other children control

    constructor(store: IndexModel) {
        this.store = store;
    }

    initPage(): Promise<> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    initView: () => void;
}