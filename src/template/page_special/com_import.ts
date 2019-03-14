import { TipsComponent, LogComponent } from "stb/plugin";
import { Player } from "@/config";

const tipsCom = new TipsComponent();
const logCom = new LogComponent();

export function tips(msg: string, duration?: number) {
    tipsCom.show(msg, duration);
};

export function log(msg: string) {
    logCom.push(msg);
}


let play: Player;

export function createSamllPlayer(identCode, event) {
    play = new Player({ identCode: identCode }, event);
}

export function releaseSamllPlayer() {
    if (play) {
        play.release();
    }
}

export function playSmallPlayer(playUrl: string) {
    if (play) {
        play.play(playUrl);
    }
}