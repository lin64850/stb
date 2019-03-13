import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom } from "../com_import";
import { Dictionary } from "stb/conllection";

export class MenuModel {
    /**
     * 焦点序号
     */
    private index: number;
    /**
     * 主入口数据实体
     */
    private readonly nttMain: MainEntity;

    constructor(nttMain: MainEntity) {
        this.nttMain = nttMain;
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