/**
 * 播放
 */
let Play: IPlay;

Play = (params: IPlayParams, callBack: (method: "jump" | "apk") => Promise<any>) => {
    return new Promise((resolve, reject) => {

        // 根据参数选择播放方式
        // TODO

        let hasJump = true;
        const { } = params;

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
function playJump(params: IPlayParams) {
    // TODO
}

/**
 * APK跳转
 * @description 编写跳转跳转APK播放器代码
 */
function playApk(params: IPlayParams) {
    // TODO
}

/**
 * 订购回调 
 * @description EPG 跳转、表单跳转、APK打开回调处理
 */
let PlayCallBack: IOrderCallBack;

PlayCallBack = (...args) => {
    // TODO

}

/**
 * APK 回调
 */
window['PlayCallBack'] = PlayCallBack;

export { Play }