import { MainEntity } from "src/entitys/main";
import { Dictionary } from "stb/conllection";
import { lgcVid } from "../com_import";

export class RecommendModel {
    private readonly nttMain: MainEntity;
    private readonly lgcVid = lgcVid;
    private readonly cache = new Dictionary();
    private dataLength: number;
    
    constructor(nttMain: MainEntity) {
        this.nttMain = nttMain;
    }

    getData(videoId: string): Promise<VideoRecomEntity> {
        return new Promise((resolve, reject) => {
            this.lgcVid.getVideoRecom({
                video_id: videoId,
                business_code: this.nttMain.global_variable.business_code,
                token: this.nttMain.token,
                fetch: "7",
            }, this.cache).then((data) => {
                if (data._success) {
                    this.dataLength = data.data.list.length;
                    resolve(data.data.list);
                } else {
                    reject('error')
                }
            })
        });
    }

    getDataLength() {
        return this.dataLength;
    }
}