import { PageModel } from "../model/page_m";
import { NavModel } from "../model/nav_m";
import { NavControl } from "./nav_c";

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

            const { key, index, navIdx, menIdx, pagIdx, viewStatus, navStart } = this.store.getMemo();

            // 导航
            this.conNav.initPage({ navIdx: navIdx, navStart }).then(() => {
                // 控制区域
                this.conTro.initPage({ index: key === MType.Control ? index : 0 });

                // 选中项
                let ntt = this.modNav.getItem();

                // 内容
                this.conTen.initPage({ recomPageTemplate: ntt.recom_page_template, packageKey: ntt.page_key },
                    { navIdx: navIdx, index, menIdx, pagIdx, viewStatus });

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
                this.conTen.initPage(
                    {
                        recomPageTemplate: ntt.recom_page_template,
                        packageKey: ntt.page_key
                    },
                    {
                        navIdx: navIdx, index: 0,
                        menIdx: 0,
                        viewStatus: "",
                        pagIdx: 0
                    }
                );

                resolve();

            });
        });
    }
    getStatus(identCode: MType, index: number): IMemo {
        let memo = {
            key: identCode,
            index: index,
            navIdx: this.modNav.getIndex(),
            menIdx: 0,
            pagIdx: 1,
            viewStatus: "",
            navStart: this.modNav.cute.getIndex()
        }
        // 推荐模板
        if (MType.Recommend === memo.key) {

        }
        // 列表模板
        else if (MType.List === memo.key) {
            // 视图状态
            memo.viewStatus = this.conTen.modLis.getViewStatus();

            // 菜单坐标
            memo.menIdx = this.conTen.modMen.getIndex();

            // 页码
            memo.pagIdx = this.conTen.modLis.paging.getPageIndex();

        }
        // 控制区域
        else if (MType.Control === memo.key) {

        }

        return memo;
    }
}