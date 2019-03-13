import { PageModel } from "../model/page_m";
import { MenuModel } from "../model/menu_m";
import { MenuControl } from "./menu_c";
import { ListModel } from "../model/list_m";
import { ListControl } from "./list_c";
import { MType, IMemo } from "..";

export class PageControl {
    private readonly store: PageModel;

    // other children model
    public readonly modMen: MenuModel;
    public readonly modLis: ListModel;

    // other children control
    public readonly conMen: MenuControl;
    public readonly conLis: ListControl;

    constructor(store: PageModel) {
        this.store = store;

        this.modMen = new MenuModel(this.store.nttMain);
        this.modLis = new ListModel(this.store.nttMain, 10);

        this.conMen = new MenuControl(this.modMen);
        this.conLis = new ListControl(this.modLis);
    }

    initPage(): Promise<{ identCode }> {

        return new Promise((resolve, reject) => {

            const { key, index } = this.store.getMemo();

            this.conMen.initPage({ packageKey: "" }, { index }).then(() => {

                // 选中项
                let ntt = this.modMen.getItem();

                // 内容
                this.conLis.initPage();

                resolve({ identCode: key });

            });

        });
    }
    /**
     * 切换页面内容
     */
    switchPage({ navIdx }): Promise<any> {
        return new Promise((resolve, reject) => {

            // 导航
            this.conMen.switchPage({ navIdx }).then(() => {

                // 选中项
                let ntt = this.modMen.getItem();

                // 内容
                this.conLis.initPage();

                resolve();

            });
        });
    }
    getStatus(identCode: MType, index: number): IMemo {
        let memo = {
            key: identCode,
            index: index
        }

        // TODO

        return memo;
    }
}