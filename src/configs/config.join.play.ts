import { FormatUrl, Json } from "stb-tools";
import { Tools } from "./config.tool";

/**
 * 播放
 */
let Play: Config.IPlay;

Play = (params: Config.IPlayParams, callBack: (methmethod: "jump" | "apk", jumpUrl: string) => void) => {
    return new Promise((resolve, reject) => {

        let hasJump = true;

        if (hasJump) {
            // EPG 跳转播放
            callBack("jump", playJump(params));

        } else {

            // APK 调起播放
            // callBack("apk").then(() => {
            //     playApk(params);
            // });

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

    const jumpUrl = "";
    // TODO

    return jumpUrl;
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