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
    public readonly store: PageModel;

    public readonly modKeyboard: KeyboardModel;
    public readonly modDefault: DefaultModel;
    public readonly modEmpty: EmptyModel;
    public readonly modList: ListModel;
    public readonly modExpand: ExpandModel;
    public readonly modTab: TabModel;

    public readonly props: IPageControlProps;
    public readonly conKeyBoard: KeyboardControl;
    public readonly conDefault: DefaultControl;
    public readonly conEmpty: EmptyControl;
    public readonly conList: ListControl;
    public readonly conExpand: ExpandControl;
    public readonly conTab: TabControl;


    constructor(parms: IPageControlProps) {
        this.props = parms;
        this.store = new PageModel(parms.nttMain);

        this.modKeyboard = new KeyboardModel(mainNtt);
        this.modDefault = new DefaultModel(mainNtt);
        this.modEmpty = new EmptyModel(mainNtt);
        this.modList = new ListModel(8, mainNtt);
        this.modExpand = new ExpandModel(mainNtt);
        this.modTab = new TabModel(mainNtt);

        this.conKeyBoard = new KeyboardControl(this.store.modKeyboard);
        this.conDefault = new DefaultControl(this.store.modDefault);
        this.conEmpty = new EmptyControl(this.store.modDefault);
        this.conList = new ListControl(this.store.modList);
        this.conExpand = new ExpandControl(this.store.modExpand);
        this.conTab = new TabControl(this.store.modTab)
    }

    initPage(search): Promise<any> {
        return new Promise((resolve) => {
            this.conDefault.initData(search).then(() => {
                this.conTab.switchView(0);
                resolve();
            });
        });
    }

    initSearch({ pageIndex, keyword, search }): Promise<any> {
        return new Promise((resolve) => {
            this.conList.initData({ pageIndex, keyword, search }).then((data) => {
                if (data.length > 0) {
                    this.conTab.switchView(2);
                }
                resolve(data);
            });
        });
    }

    initEmpty(search): Promise<any> {
        return new Promise((resolve) => {
            this.conEmpty.initData(search).then(() => {
                this.conTab.switchView(1);
                resolve();
            });
        });
    }
}