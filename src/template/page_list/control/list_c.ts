import { ListModel } from "../model/list_m";

export class ListControl {
    private readonly store: ListModel;

    // other children model

    // other children control

    constructor(store: ListModel) {
        this.store = store;
    }

    initPage(): Promise<void> {
        return new Promise((resolve, reject) => {

            

            resolve();
        });
    }
    initView: () => void;
}