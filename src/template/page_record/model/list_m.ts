import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom, lgcPly, lgcCol } from "../com_import";
import { Dictionary } from "stb/conllection";
import { WholePageControl } from "stb/controller";
import { Paging } from "stb/basic";

interface ICondition {
    method: 'play' | 'collect';
}

export class ListModel extends WholePageControl {
    /**
     * 分页对象（父类维护）
     */
    public readonly paging: Paging;

    /**
     * 数据源
     */
    private readonly lgcPly = lgcPly;
    private readonly lgcCol = lgcCol;

    /**
     * 主入口数据实体
     */
    private readonly nttMain: MainEntity;

    /**
     * 数据缓存
     */
    private cache = new Dictionary<AssetPackageEntity>();

    /**
     * 条件
     */
    private condition: ICondition;

    constructor(nttMain: MainEntity, size: number) {
        super(size);
        this.nttMain = nttMain;
    }
    /**
     * 某项数据
     * @param serial 为空取当前选中项
     */
    getItem(serial?): Promise<AssetPackageItemEntity> {
        return new Promise((resolve) => {
            let index = serial;

            if (undefined === index) index = this.index;

            this.getData(this.paging.getPageIndex())
            resolve(this.dataList[index]);
        });
    }
    /**
     * 设置条件
     * @param condition 坐标序号
     */
    setCondition(condition: ICondition) {
        this.condition = condition;
        this.paging.clear();
        this.cache.clear();
    }
    /**
     * 读取条件
     */
    getCondition(): ICondition {
        return this.condition;
    }
    protected getData(pageIndex: number): Promise<PlaylistEntity> {
        return new Promise((resolve) => {

            let req, method = this.condition ? this.condition.method : '';

            if ("play" === method) {
                req = (pageIndex) => {
                    return new Promise((resolve, reject) => {
                        this.lgcPly.getPlayList({
                            token: this.nttMain.token,
                            page_size: `${this.paging.getPageSize()}`,
                            page_number: pageIndex
                        }).then((info) => {
                            if (info._success) {
                                if (!this.paging.getCountPage()) {
                                    this.paging.setDataSize(Number(info.data.total));
                                }
                                resolve(info.data.list);
                            }
                        });
                    });
                }
            } else if ("collect" === method) {
                req = (pageIndex) => {
                    return new Promise((resolve, reject) => {
                        this.lgcCol.getCollectList({
                            token: this.nttMain.token,
                            page_size: `${this.paging.getPageSize()}`,
                            page_number: pageIndex
                        }).then((info) => {
                            if (info._success) {
                                if (!this.paging.getCountPage()) {
                                    this.paging.setDataSize(Number(info.data.total));
                                }
                                resolve(info.data.list);
                            }
                        });
                    });
                }
            }
            // 预览
            // if (undefined != method) {
            //     req(pageIndex).then((list: any[]) => {
            //         if (this.paging.isNextPage()) {
            //             req(pageIndex + 1).then((list2) => {
            //                 resolve(list.concat(list2));
            //             });
            //         } else {
            //             resolve(list);
            //         }
            //     });
            // }
            // 普通
            if (undefined != method) {
                req(pageIndex).then((list: any[]) => {
                    if (this.paging.isNextPage()) {
                        req(pageIndex + 1).then((list2) => {
                            resolve(list.concat(list2));
                        });
                    } else {
                        resolve(list);
                    }
                });
            }
        });
    }
}