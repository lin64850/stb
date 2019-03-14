import { KeyboardModel } from "../model/keyboard_m";

export class KeyboardControl {
    private readonly store: KeyboardModel;
    readonly keywordTips = "请输入片名的首字母";

    constructor(parms: KeyboardModel) {
        this.store = parms;
    }

    initData(keyword): Promise<{ list }> {
        return new Promise((resolve) => {
            this.initKeyboard(keyword);
            resolve();
        });
    }

    initKeyboard: (keyword: string) => Promise<any>;

    changeIsExpand: (status: boolean) => void;

    changeInputText: (keyword: string) => void;

    getKeyword: () => string;

    entrance(def, key) {
        if (this.keywordTips === def) {
            return key;
        } else {
            return def + key;
        }
    }

    backspace(def) {
        if (this.keywordTips === def || !def || 1 == def.length) {
            return this.keywordTips;
        } else {
            return def.substr(0, def.length - 1);
        }
    }

    isShowKeypad: (status: boolean) => void;
}