import { PageModel } from "../model/page_m";
import { MType, IMemo } from "..";

export class PageControl {
    private readonly store: PageModel;

    // other children model

    // other children control

    constructor(store: PageModel) {
        this.store = store;
    }

    initPage(): Promise<{ identCode }> {
        return new Promise((resolve, reject) => {
            resolve({ identCode: MType.Page });
        });
    }
    getStatus(identCode: MType, index: number): IMemo {
        let memo = {
            key: identCode,
            index: index
        }

        // TODO

        return memo;
    }
}