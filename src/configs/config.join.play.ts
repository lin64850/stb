import { FormatUrl, Json } from "stb-tools";
import { Tools } from "./config.tool";

/**
 * 播放
 */
let Play: Config.IPlay;

Play = (params: Config.IPlayParams, callBack: (method: "jump" | "apk") => Promise<any>) => {
    return new Promise((resolve, reject) => {

        let hasJump = true;

        if (hasJump) {
            // EPG 跳转播放
            callBack("jump").then(() => {
                playJump(params);
            });

        } else {

            // APK 调起播放
            callBack("apk").then(() => {
                playApk(params);
            });

        }
        resolve();
    });
}

/**
 * EPG跳转
 * @description 编写跳转跳转EPG播放器代码
 */
function playJump(params: Config.IPlayParams) {

    const { episode, continueSecond, videoId, playUrl } = params;

    const jumpUrl = new FormatUrl('./play.html', {
        /**
         * 频道号或者播放串
         */
        value: (undefined !== videoId && null !== videoId) ? Json.serializ({ video_id: videoId, episode: episode }) : videoId,
        /**
         *  流类型 直播流(live) 点播流(dot)
         */
        stream_type: "dot",
        /**
         * 播放源类型（频道号、播放串
         */
        value_type: (undefined !== videoId && null !== videoId) ? "asset" : "playstring",
        back_url: Tools.filterParams(window.location.href, ['back_url']),
        position: continueSecond
    }).getEncodeURIComponent();

    window.location.href = jumpUrl;
}

/**
 * APK跳转
 * @description 编写跳转跳转APK播放器代码
 */
function playApk(params: Config.IPlayParams) {
    // TODO
}

/**
 * 订购回调 
 * @description EPG 跳转、表单跳转、APK打开回调处理
 */
let PlayCallBack: Config.IPlayCallBack;

PlayCallBack = (href: string) => {
    // TODO

}

/**
 * APK 回调
 */
window['PlayCallBack'] = PlayCallBack;

export { Play }