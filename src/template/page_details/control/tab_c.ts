import { TabModel } from "../model/tab_m";
import { Key } from "@/config";

export class TabControl {
    private readonly store: TabModel;

    constructor(store: TabModel) {
        this.store = store;
    }

    initPage({ index, pageIndex }): Promise<> {
        return new Promise((resolve) => {
            this.store.toIndex(pageIndex).then((dataList) => {
                this.initView({ dataList }, { index });
                resolve(dataList);
            });
        })
    }

    initView: ({ dataList }, { index }) => void;
}