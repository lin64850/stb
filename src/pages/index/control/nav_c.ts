import { NavModel } from "../model/nav_m";

export class NavControl {
    private readonly store: NavModel;

    // other children model

    // other children control

    constructor(store: NavModel) {
        this.store = store;
    }

    /**
     * 初始化视图
     */
    initPage({ navIdx }): Promise<any> {
        return new Promise((resolve, reject) => {

            this.store.initData().then((list) => {

                this.store.setIndex(navIdx);

                this.initView(list, { navIdx });

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

    initView: (dataList, { navIdx }) => void;
}