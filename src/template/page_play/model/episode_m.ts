import { WholePageControl } from "stb/controller";
import { VideoLogic } from "src/logics/video";
import { Paging } from "stb/basic";
import { MainEntity } from "src/entitys/main";

export class EpisodeModel extends WholePageControl {
    private lgcVd = new VideoLogic();
    videoId: string;
    dataList: any;
    private readonly nttMain: MainEntity;
    paging: Paging;
    private nttDet;

    constructor(size, nttMain) {
        super(size);
        this.nttMain = nttMain;
    }

    // 加载其他影片
    changeCondition(videoId: string) {
        this.videoId = videoId;
        this.paging = new Paging(this.cuteRange);
    }

    protected getData(index): Promise<any[]> {
        const pageSize = this.paging.getPageSize(), pageIndex = index;
        return new Promise((resolve) => {
            this.lgcVd.getVideoEpisode({
                video_id: this.videoId,
                page: pageIndex,
                limit: pageSize,
                order: "asc",
                token: this.nttMain.token
            }).then((info) => {
                if (info._success) {
                    const { list, total } = info.data;
                    if (!this.paging.getCountPage()) {
                        this.paging.setDataSize(Number(total));
                    }
                    this.dataList = list
                    resolve(list);
                }
            });
        });
    }

    // 详情数据
    getDetails() {
        return new Promise((resolve) => {
            if (!this.nttDet) {
                this.lgcVd.getVideoDetail({ video_id: this.videoId, business_code: this.nttMain.global_variable.business_code, token: this.nttMain.token }).then((info) => {
                    if (info._success) {
                        this.nttDet = info.data;
                        resolve(info.data);
                    }
                });
            } else {
                resolve(this.nttDet);
            }
        });
    }
}