import { IRequest, IMemo, MType } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom } from "../com_import";

interface IPageModelProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageModel {
    private readonly initparams: IPageModelProps;
    public readonly nttMain: MainEntity;
    public readonly request: IRequest;

    // declear logic
    // private lgcCom = lgcCom;

    // other children model

    constructor(parms: IPageModelProps) {
        this.initparams = parms;
        this.nttMain = this.initparams.nttMain;
        this.request = this.initparams.requ;
    }

    getMemo(): IMemo {
        return this.initparams.memo || {
            key: MType.Page,
            index: 0
        }
    }
}