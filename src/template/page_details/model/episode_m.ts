import { MainEntity } from "src/entitys/main";
import { Paging } from "stb/basic";
import { Dictionary } from "stb/conllection";
import { WholePageControl } from "stb/controller";
import { lgcVid } from "../com_import";

export class EpisodeModel extends WholePageControl {
    private readonly nttMain: MainEntity;
    private readonly lgcVid = lgcVid;
    private readonly cache = new Dictionary();
    private condition: { videoId: string; ext: any; };
    private size: number;
    /**
     * 焦点序号
     */
    private index: number;
    public readonly paging: Paging;

    constructor(size, nttMain: MainEntity) {
        super(size);
        this.setSize(size);
        this.nttMain = nttMain;
    }

    protected getData(pageIndex): Promise<VideoEpisodeEntity> {
        const pageSize = this.paging.getPageSize();

        return new Promise((resolve, reject) => {
            this.lgcVid.getVideoEpisode({
                video_id: this.condition.videoId,
                page: pageIndex,
                limit: pageSize,
                order: this.condition.ext ? this.condition.ext.episode_order_rule : "asc",
                token: this.nttMain.token,
            }, this.cache).then((info) => {
                if (info._success) {
                    const { list, total } = info.data;
                    if (!this.paging.getCountPage()) {
                        this.paging.setDataSize(Number(total));
                    }
                    resolve(list);
                } else {
                    reject();
                }
            });
        });
    }

    getTabs(pageIndex: number, pageSize: number): Promise<{ countPage: number, countData: number, list }> {
        // 真实总长度
        return new Promise((resolve, reject) => {
            let totalTab;
            const pullTabs = () => {
                const nets = [];
                totalTab = (Math.ceil(this.paging.getDataSize() / 10));
                for (let i = 0; i < pageSize; i++) {
                    const target = (pageIndex - 1) * pageSize + i + 1;
                    // 小于总长度
                    if (target <= totalTab) {
                        nets.push(new Promise((resolve, reject) => {
                            this.getData(target).then((list) => {
                                resolve({ page: target, list: list });
                            }).catch(() => {
                                resolve({ page: target, list: [] });
                            })
                        }));
                    }
                }
                Promise.all(nets).then((list) => {
                    // 计算显示
                    const ret = list.map((v: any) => {
                        return { page: v.page, value: `${v.list[0].seq}-${v.list[v.list.length - 1].seq}` }
                    });
                    resolve({ countPage: Math.ceil(totalTab / pageSize), countData: totalTab, list: ret });
                });
            }
            // 总长度初始化
            if (undefined == this.paging.getDataSize()) {
                this.getData(1).then(() => {
                    pullTabs();
                });
            } else {
                pullTabs();
            }
        });
    }

    setCondition(videoId: string, ext) {
        this.condition = {
            videoId,
            ext,
        }
        this.paging.clear();
    }

    /**
     * 设置焦点坐标
     * @param index 坐标序号
     */
    setIndex(index: number) {
        this.index = index;
    }

    /**
     * 读取焦点坐标
     */
    getIndex() {
        return this.index;
    }

    setSize(size: number) {
        this.size = size;
    }

    getSize() {
        return this.size;
    }
}