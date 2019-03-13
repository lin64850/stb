import { PageModel } from "../model/page_m";
import { NavModel } from "../model/nav_m";
import { NavControl } from "./nav_c";
import { ContentModel } from "../model/content_m";
import { ContentControl } from "./content_c";
import { MType, IMemo } from "..";

export class PageControl {
    private readonly store: PageModel;

    // other children model
    public readonly modNav: NavModel;
    public readonly modTen: ContentModel;

    // other children control
    public readonly conNav: NavControl;
    public readonly conTen: ContentControl;

    constructor(store: PageModel) {
        this.store = store;

        this.modNav = new NavModel(this.store.nttMain);
        this.modTen = new ContentModel(this.store.nttMain);

        this.conNav = new NavControl(this.modNav);
        this.conTen = new ContentControl(this.modTen);
    }

    initPage(): Promise<{ identCode }> {

        return new Promise((resolve, reject) => {

            const { key, index } = this.store.getMemo();

            // 导航
            this.conNav.initPage({ navIdx: 0 }).then(() => {

                // 选中项
                let ntt = this.modNav.getItem();

                // 内容
                this.conTen.initPage();

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
            this.conNav.switchPage({ navIdx }).then(() => {

                // 选中项
                let ntt = this.modNav.getItem();

                // 内容
                this.conTen.initPage();

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