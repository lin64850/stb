import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom } from "../com_import";

interface IPageModelProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageModel {
    private readonly initparams: IPageModelProps;

    // declear logic
    // private lgcCom = lgcCom;

    // other children model

    constructor(parms: IPageModelProps) {
        this.initparams = parms;
    }

    initData(): Promise<> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}