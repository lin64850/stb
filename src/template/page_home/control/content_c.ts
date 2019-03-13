import { ContentModel } from "../model/content_m";

export class ContentControl {
    private readonly store: ContentModel;

    // other children model

    // other children control

    constructor(store: ContentModel) {
        this.store = store;
    }

    initPage(): Promise<> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
    initView: ({ dipslay }) => void;
}