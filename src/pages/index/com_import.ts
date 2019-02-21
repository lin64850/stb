import { TipsComponent, LogComponent } from "stb/plugin";
import { CommonLogic } from "src/logics/common";

// declare tools
const tipsCom = new TipsComponent();
const logCom = new LogComponent();

// declare logic
const lgcCom = new CommonLogic();

export function tips(msg: string, duration?: number) {
    tipsCom.show(msg, duration);
};

export function log(msg: string) {
    logCom.push(msg);
}

export { lgcCom }