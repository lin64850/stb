import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { ContentModel } from "../model/content_m";


export class ContentControl {

    private store: ContentModel;

    constructor(parms: ContentModel) {
        this.store = parms;
    }

    initData(data:any): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            this.store.setData(data.background_image_url,data.item);

            this.initContent(data.background_image_url,data.item);
            resolve();
        });
    }

    initContent: (background,list)=> Promise<any>;

    switchBackground: (background)=> void;
}