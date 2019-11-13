import { MainEntity } from "../../../entitys";
import { NavModel } from "./nav_model";
import { BodyModel } from "./body_model";
import { Tools } from "../../../configs";
import { MType } from "..";
import { ControlModel } from "./control_model";

export class RootModel {
    private readonly nttMain: MainEntity;
    private readonly request: Index.IRequest
    private readonly memo: Index.IMemo;

    readonly modNav: NavModel;
    readonly modBody: BodyModel;
    readonly modCont: ControlModel;

    bg: string = "";

    constructor(nttMain: MainEntity, request: Index.IRequest, memo: Index.IMemo) {
        this.nttMain = nttMain;
        this.request = request;
        this.memo = memo || this.initMemo();

        this.modNav = new NavModel();
        this.modBody = new BodyModel();
        this.modCont = new ControlModel();
    }

    init() {
        return new Promise((resolve) => {
            // 控制
            this.modCont.init({}, this.memo);
            // 导航
            this.modNav.init({}, this.memo).then(() => {

                // 内容
                this.modBody.init();

            });
            resolve({ target: MType.Nav });
        })
    }

    initMemo = (): Index.IMemo => ({ identCode: MType.Nav, index: 0 })
    getMemo = (identCode) => {
        const memo: Index.IMemo = {
            identCode: identCode,
            index: this.modBody.getIndex()
        }
        return memo;
    }
}