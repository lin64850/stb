import { ListModel } from "../model/list_m";

export class ListControl {
    public readonly store: ListModel;

    constructor(parms: ListModel) {
        this.store = parms;
    }

    initData({ pageIndex, keyword, index }): Promise<any> {
        this.store.setKeyword(keyword);
        return new Promise((resolve) => {
            this.store.toIndex(pageIndex).then((list) => {
                this.initList(list, index);
                resolve(list);
            });
        });
    }

    initList: (list, index) => Promise<any>;
}