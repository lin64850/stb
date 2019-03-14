import { ProgressModel } from "../model/progress_m";

export class ProgressControl {
    private readonly store: ProgressModel

    constructor(parms: ProgressModel) {
        this.store = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }

    initProgressView: (title: string, { pageIndex, index, seq }) => Promise<any>;

}