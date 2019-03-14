import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { PageModel } from "../model/page_m";
import { KeyboardControl } from './keyboard_c';
import { DefaultControl } from './default_c';
import { EmptyControl } from './empty_c';
import { ListControl } from "./list_c";
import { ExpandControl } from "./expand_c";
import { TabControl } from "./tab_c";

interface IPageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageControl {
    public readonly props: IPageControlProps;
    public readonly store: PageModel;
    public readonly conKeyBoard: KeyboardControl;
    public readonly conDefault: DefaultControl;
    public readonly conEmpty: EmptyControl;
    public readonly conList: ListControl;
    public readonly conExpand: ExpandControl;
    public readonly conTab: TabControl;


    constructor(parms: IPageControlProps) {
        this.props = parms;
        this.store = new PageModel(parms.nttMain);
        this.conKeyBoard = new KeyboardControl(this.store.modKeyboard);
        this.conDefault = new DefaultControl(this.store.modDefault);
        this.conEmpty = new EmptyControl(this.store.modDefault);
        this.conList = new ListControl(this.store.modList);
        this.conExpand = new ExpandControl(this.store.modExpand);
        this.conTab = new TabControl(this.store.modTab)
    }

    initPage(index): Promise<any> {
        return new Promise((resolve) => {
            this.conDefault.initData(index).then(() => {
                this.conTab.switchView(0);
                resolve();
            });
        });
    }

    initSearch({ pageIndex, keyword, index }): Promise<any> {
        return new Promise((resolve) => {
            this.conList.initData({ pageIndex, keyword, index }).then((data) => {
                if (data.length > 0) {
                    this.conTab.switchView(2);
                }
                resolve(data);
            });
        });
    }

    initEmpty(index): Promise<any> {
        return new Promise((resolve) => {
            this.conEmpty.initData(index).then(() => {
                this.conTab.switchView(1);
                resolve();
            });
        });
    }
}