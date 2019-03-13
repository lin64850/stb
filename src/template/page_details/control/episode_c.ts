import { EpisodeModel } from "../model/episode_m";

export class EpisodeControl {
    private readonly store: EpisodeModel;

    constructor(store: EpisodeModel) {
        this.store = store;
    }

    initPage({ index, selectEpisode, pageIndex }): Promise<any> {
        return new Promise((resolve) => {
            this.store.toIndex(pageIndex).then((dataList) => {
                this.initView({ dataList }, { index, selectEpisode });
                resolve(dataList);
            });
        });
    }

    changeTab(conTab) {
        let size = this.store.getSize();
        let page = this.store.paging.getPageIndex();
        let startIndex = page % size === 0 ? (size - 1) : page % size - 1;
        let pageIndex = Math.ceil(page / size);
        conTab.initPage({ pageIndex: pageIndex, index: startIndex });
    }

    initView: ({ dataList }, { index, selectEpisode }) => void;
}