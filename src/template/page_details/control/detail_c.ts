import { DetailModel } from "../model/detail_m";

export class DetailControl {
    private readonly store: DetailModel;

    constructor(store: DetailModel) {
        this.store = store;
    }

    initPage({ videoId }, { index }): Promise<any> {
        return new Promise((resolve) => {
            this.store.getData(videoId).then((data) => {
                this.store.hasCollected(videoId).then((hasCollected) => {
                    this.initView({ index });
                    resolve(data);
                });
            });
        });
    }

    initView: ({ index }) => void;
}