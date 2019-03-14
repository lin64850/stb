import { TabModel } from "../model/tab_m";

export class TabControl {
    private readonly store: TabModel;

    constructor(parms: TabModel) {
        this.store = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }

    switchView: (display: number) => void;

    getPageType: () => number;
}