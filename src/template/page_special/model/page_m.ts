import { CommonLogic } from "src/logics/common";
import { SpecialLogic } from "src/logics/special";
import { MainEntity } from "src/entitys/main";
import { IMemo, IRequest } from "..";
import { ContentModel } from "./content_m";

interface IPageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageModel {
    private readonly lgcSpec = new SpecialLogic();
    private id: string;
    private nttMain: MainEntity;

    public modContent: ContentModel;
    // getSpecialDetails

    constructor(ntt: IPageControlProps) {
        this.id = ntt.requ.special_id;
        this.nttMain = ntt.nttMain;
        this.modContent = new ContentModel();
    }
    getData() {
        return new Promise((resolve, reject) => {
            this.lgcSpec.getSpecialDetails({
                id: this.id,
                token: this.nttMain.token
            }).then((res) => {
                if (res._success) {
                    resolve(res.data);
                } else {
                    resolve();
                }
            });
        });
    }

    // 获取视频鉴权
    getVideoAuth(videoId: string, episode: number, backUrl: string): Promise<AuthenticationResult> {
        return new Promise((resolve, reject) => {
            Authentication(videoId, episode, this.nttMain.token, this.nttMain.global_variable.business_code, backUrl).then((ret) => {
                resolve(ret);
            });
        });
    }
}