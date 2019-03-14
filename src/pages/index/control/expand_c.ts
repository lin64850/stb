import { ExpandModel } from "../model/expand_m";

export class ExpandControl {
    private readonly store: ExpandModel;

    constructor(parms: ExpandModel) {
        this.store = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}