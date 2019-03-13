import { MainEntity } from "src/entitys/main";
import { Dictionary } from "stb/conllection";
import { lgcVid, lgcCol } from "../com_import";

export class DetailModel {
    private readonly nttMain: MainEntity;
    private readonly lgcVic = lgcVid;
    private readonly lgcCol = lgcCol;
    private readonly cache = new Dictionary();

    constructor(nttMain: MainEntity) {
        this.nttMain = nttMain;
    }

    getData(videoId: string): Promise<VideoDetailEntity> {
        return new Promise((resolve, reject) => {
            this.lgcVic.getVideoDetail({
                video_id: videoId,
                token: this.nttMain.token,
                business_code: this.nttMain.global_variable.business_code,
            }, this.cache).then((data) => {
                if (data._success) {
                    resolve(data.data);
                } else {
                    reject('error');
                }
            })
        });
    }

    hasCollected(videoId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.lgcCol.hasCollect({
                video_id: videoId,
                token: this.nttMain.token,
            }).then((data) => {
                if (data._success) {
                    resolve(data.data.result);
                } else {
                    reject("error");
                }
            })
        })
    }

    addCollect(videoId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.lgcCol.addCollect({
                video_id: videoId,
                token: this.nttMain.token,
            }).then((info) => {
                if (info._success) {
                    resolve(info.data);
                } else {
                    reject("error");
                }
            })
        });
    }

    cancelCollect(videoId: string): Promise<boolean> {
        return new Promise((resolve, reject) => {
            this.lgcCol.deleteCollect({
                video_id: videoId,
                token: this.nttMain.token,
            }).then((info) => {
                if (info._success) {
                    resolve(info.data);
                } else {
                    reject("error");
                }
            })
        });
    }
}