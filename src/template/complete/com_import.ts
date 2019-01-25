import { TipsComponent, LogComponent } from "stb/plugin";

const tipsCom = new TipsComponent();
const logCom = new LogComponent();

// export const index_bg = require("../../package/images/");

export function tips(msg: string, duration?: number) {
    tipsCom.show(msg, duration);
};

export function log(msg: string) {
    logCom.push(msg);
}