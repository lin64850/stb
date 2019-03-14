import { TipsComponent, LogComponent } from "stb/plugin";
import { Player, initMain } from "@/config";
import { PlayListLogic } from "src/logics/playlist";
import { formatDate } from "stb/basic";

const tipsCom = new TipsComponent();
const logCom = new LogComponent();

export function tips(msg: string, duration?: number) {
    tipsCom.show(msg, duration);
};

export function log(msg: string) {
    logCom.push(msg);
}

export let play: Player;

export function createPlayer(identCode, event) {
    play = new Player({ identCode: identCode }, event);
}

export function releasePlayer() {
    if (play) {
        play.release();
    }
}

export function playFullPlayer(playUrl: string) {
    if (play) {
        play.displayFull();
        play.play(playUrl);
    }
}

export function playPointFullPlayer(playUrl: string, point: number) {
    if (play) {
        play.displayFull();
        play.playPoint(playUrl, point);
    }
}

export function stop() {
    if (play) {
        play.stop();
    }
}

export function getCurrentTime() {
    if(play) {
        return play.getTime();
    }
}

const viewTime = new Date().getTime();
const openTime = formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss');
// 播放上报
export function addPlay(videoId, episode, end_position) {
    let playTime = Math.round((new Date().getTime() - viewTime) / 1000);
    initMain().then((ntt: any) => {
        new PlayListLogic().addPlayList({
            token: ntt.token,
            begin_position: "0",
            end_position: end_position,
            play_time: playTime,
            play_start_time: openTime,
            episode: episode,
            video_id: videoId,
        });
    });
}

