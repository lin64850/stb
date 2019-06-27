import { SetTimeout } from "stb-tools";

export class FuncOvertime {
    private readonly timer: SetTimeout;

    constructor(time) {
        this.timer = new SetTimeout(time);
    }

    clear() {
        this.timer.clear();
    }
    enable(method: Promise<any>, callback: Function) {

        this.timer.enable(() => {
            this.timer.clear();
            callback && callback();
        })

        method.then(() => {
            this.timer.clear();
            callback && callback();
        })
    }
}