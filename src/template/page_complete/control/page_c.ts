import { PageModel } from "../model/page_m";

export class PageControl {
    private readonly store: PageModel;

    // other children model

    // other children control
    
    constructor(store: PageModel) {
        this.store = store;
    }

    initPage(): Promise<> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}