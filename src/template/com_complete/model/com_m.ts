import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom } from "../com_import";

interface IIndexModelProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class IndexModel {
    private readonly initparams: IIndexModelProps;

    // declear logic
    // private lgcCom = lgcCom;

    // other children model

    constructor(parms: IIndexModelProps) {
        this.initparams = parms;
    }

    initData(): Promise<> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}