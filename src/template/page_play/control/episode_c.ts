import { EpisodeModel } from "../model/episode_m";

export class EpisodeControl {
    private readonly store: EpisodeModel;
    public currentIndex = 0;

    constructor(parms: EpisodeModel) {
        this.store = parms;
    }

    initData({ pageIndex, startIndex }): Promise<any> {
        return new Promise((resolve) => {
            this.store.toIndex(pageIndex).then((list) => {
                if (list && list.length) {
                    this.initView(list, pageIndex, startIndex);
                    resolve(list);
                }
            });
        })
    }

    setCurrentIndex: (index: number) => void;

    initView: (dataList: any[], pageIndex, index) => Promise<any>;
}