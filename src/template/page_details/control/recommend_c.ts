import { RecommendModel } from "../model/recommend_m";

export class RecommendControl {
    private readonly store: RecommendModel;

    constructor(store: RecommendModel) {
        this.store = store;
    }

    initPage({ videoId }): Promise<any> {
        return new Promise((resolve) => {
            this.store.getData(videoId).then((dataList) => {
                this.initView({ dataList });
                resolve(dataList);
            });
        });
    }

    initView: ({ dataList }) => void;
}