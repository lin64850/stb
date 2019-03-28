import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom } from "../com_import";

export class IndexModel {
    private readonly nttMain: MainEntity;

    // declear logic
    // private lgcCom = lgcCom;

    // other children model

    constructor(nttMain: MainEntity) {
        this.nttMain = nttMain;
    }

    initData(): Promise<void> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}