import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom, lgcAsst } from "../com_import";
import { Dictionary } from "stb/conllection";

export class MenuModel {
    /**
     * 数据源
     */
    private readonly lgcAsst = lgcAsst;

    /**
     * 主入口数据实体
     */
    private readonly nttMain: MainEntity;

    /**
     * 数据缓存
     */
    private dataList: AssetPackageEntity[] = [];

    /**
     * 焦点序号
     */
    private index: number;

    constructor(nttMain: MainEntity) {
        this.nttMain = nttMain;
    }
    /**
     * 数据列表
     */
    initData({ packageKey }): Promise<AssetPackageEntity[]> {
        return new Promise((resolve, reject) => {
            if (!this.dataList.length) {

                this.lgcAsst.getAssetPackage({
                    package_key: packageKey,
                    business_code: this.nttMain.global_variable.business_code
                }).then((info) => {
                    if (info._success) {

                        if (info.data) {
                            this.dataList = info.data;
                            resolve(info.data);

                        } else {
                            resolve([]);
                        }
                    }
                });

            } else {
                resolve(this.dataList);
            }

        });
    }
    /**
     * 某项数据
     * @param serial 为空取当前选中项
     */
    getItem(serial?): Promise<AssetPackageItemEntity> {
        return new Promise((resolve) => {
            let index = serial;

            if (undefined === index) index = this.index;

            resolve(this.dataList[index]);
        });
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
}