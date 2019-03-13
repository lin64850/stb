import { MenuModel } from "../model/menu_m";

export class MenuControl {
    private readonly store: MenuModel;

    // other children model

    // other children control

    constructor(store: MenuModel) {
        this.store = store;
    }

    /**
     * 初始化视图
     */
    initPage({ packageKey }, { index }): Promise<any> {
        return new Promise((resolve, reject) => {

            this.store.initData({ packageKey }).then((list) => {

                this.store.setIndex(index);

                this.initView(list, { index });

                resolve();
            });

        });
    }
    /**
     * 切换视图
     * @param param0 切换坐标序号
     */
    switchPage({ navIdx }): Promise<any> {
        return new Promise((resolve, reject) => {

            this.store.setIndex(navIdx);

            resolve();

        });
    }

    initView: (method: "play" | "collect") => void;
}