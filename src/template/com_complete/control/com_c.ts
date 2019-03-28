import { IndexModel } from "../model/index_m";

interface IInitIndexData {
}
interface IInitIndexMemo {
}
export interface IInitViewData {
}
export interface IInitViewMemo {
    index: number;
}

export class IndexControl {
    private readonly store: IndexModel;

    // other children model

    // other children control

    constructor(store: IndexModel) {
        this.store = store;
    }

    initPage(data: IInitIndexData, memo: IInitIndexMemo): Promise<void> {
        return new Promise((resolve, reject) => {

            const { } = data;
            const { } = memo;

            resolve();
        });
    }
    initView: (data: IInitViewData, memo: IInitViewMemo) => void;
}