import { MainEntity } from "src/entitys/main";
import { KeyboardModel } from './keyboard_m';
import { DefaultModel } from './default_m';
import { EmptyModel } from "./empty_m";
import { ListModel } from "./list_m";
import { ExpandModel } from "./expand_m";
import { TabModel } from "./tab_m";

export class PageModel {
    public readonly modKeyboard: KeyboardModel;
    public readonly modDefault: DefaultModel;
    public readonly modEmpty: EmptyModel;
    public readonly modList: ListModel;
    public readonly modExpand: ExpandModel;
    public readonly modTab: TabModel;

    constructor(mainNtt: MainEntity){
        this.modKeyboard = new KeyboardModel(mainNtt);
        this.modDefault = new DefaultModel(mainNtt);
        this.modEmpty = new EmptyModel(mainNtt);
        this.modList = new ListModel(8, mainNtt);
        this.modExpand = new ExpandModel(mainNtt);
        this.modTab = new TabModel(mainNtt);
    }
}