import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom, lgcHom } from "../com_import";
import { Dictionary } from "stb/conllection";

export class NavModel {
    /**
     * 数据源
     */
    private readonly lgcHom = lgcHom;

    /**
     * 主入口数据实体
     */
    private readonly nttMain: MainEntity;

    /**
     * 数据缓存
     */
    private readonly cache = new Dictionary();

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
    initData(): Promise<RecomPageEntity[]> {
        return new Promise((resolve, reject) => {
            // 获取导航栏数据
            this.lgcHom.getRecomPage({
                business_code: this.nttMain.global_variable.business_code
            }, this.cache).then((info) => {
                resolve(info.data);
            })
        });
    }
    /**
     * 某项数据
     * @param serial 为空取当前选中项
     */
    getItem(serial?): Promise<RecomPageEntity> {
        return new Promise((resolve) => {
            let index = serial;

            if (undefined === index) index = this.index;

            this.initData().then((list) => {
                resolve(list[index]);
            });
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