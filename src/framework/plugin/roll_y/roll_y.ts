import { HElement, Position } from "stb-tools";

export class RollY {
    private readonly ele: HElement;
    private readonly height: number;
    private readonly length: number;
    private marginTop: number;
    constructor(info: { ele: HTMLElement | Element, height: number, lenght: number }) {
        this.ele = new HElement(info.ele);
        this.height = info.height;
        this.marginTop = 0;
        this.length = info.lenght;
    }
    toCeil() {
        if (this.ele.get(0).scrollHeight > this.height) {
            this.marginTop += this.length;

            if (this.marginTop > 0) {
                this.marginTop = 0;
            }

            this.ele.style("margin-top", this.marginTop + 'px');
        }
    }
    toFloor() {
        if (this.ele.get(0).scrollHeight > this.height) {
            this.marginTop -= this.length;
            let full = -Math.round(this.ele.get(0).scrollHeight);
            let difference = full + this.height;

            if (this.marginTop < difference) {
                this.marginTop = difference;
            }

            this.ele.style("margin-top", this.marginTop + 'px');
        }
    }
    isRoll() {
        return this.ele.get(0).scrollHeight > this.height;
    }
    isCeil() {
        if (this.ele.get(0).scrollHeight > this.height) {
            if (this.marginTop >= 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    isFloor() {
        if (this.ele.get(0).scrollHeight > this.height) {
            let full = -Math.round(this.ele.get(0).scrollHeight);
            let difference = full + this.height;

            if (this.marginTop <= difference) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}

export class RollStepY {
    private readonly ele: HElement;
    private readonly height: number;
    private readonly length: number;
    private marginTop: number;
    constructor(info: { ele: HTMLElement | Element, height: number, lenght: number }) {
        this.ele = new HElement(info.ele);
        this.height = info.height;
        this.marginTop = 0;
        this.length = info.lenght;
    }
    toCeil() {
        if (this.ele.get(0).scrollHeight > this.height) {
            // 不足一步不处理
            if ((this.marginTop + this.length) > 0) {

            } else {
                this.marginTop += this.length;
                this.ele.style("margin-top", this.marginTop + 'px');
            }
        }
    }
    toFloor() {
        if (this.ele.get(0).scrollHeight > this.height) {

            let full = -Math.round(this.ele.get(0).scrollHeight);
            let difference = full + this.height;
            // 不足一步不处理
            if ((this.marginTop - this.length) < difference) {

            } else {
                this.marginTop -= this.length;
                this.ele.style("margin-top", this.marginTop + 'px');
            }
        }
    }
    isRoll() {
        return this.ele.get(0).scrollHeight > (this.height + this.length);
    }
    isCeil() {
        if (this.ele.get(0).scrollHeight > this.height) {
            if ((this.marginTop + this.length) > 0) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
    isFloor() {
        if (this.ele.get(0).scrollHeight > this.height) {
            let full = -Math.round(this.ele.get(0).scrollHeight);
            let difference = full + this.height;

            if ((this.marginTop - this.length) < difference) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }
}