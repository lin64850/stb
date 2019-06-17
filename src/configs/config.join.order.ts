import { Authentication } from "./config.join.auth";
import { Play } from "./config.join.play";
import { Json, PageSource } from "stb-tools";
import { backLaunch } from "./config.join";
import { Cookie } from "stb-cookie";
import { ConfigBasic } from "./config.basic";

/**
 * 订购
 */
let Order: Config.IOrder = (params: Config.AuthenticationResult, callBack) => {
    return new Promise((resolve, reject) => {

        const { jumpUrl, productPackage } = params;

        if (jumpUrl && jumpUrl.trim()) {

            // 前往订购
            callBack("jump").then(() => {
                orderJump(params);
            });

        } else if (productPackage) {

            // 产品包选择
            callBack("product").then(() => {
                orderProduct(params);
            });

        } else {
            reject("Order:method 为空或类型错误");
            return;
        }
        resolve();
    });
}

/**
 * 订购跳转
 * @description 编写跳转订购代码
 */
function orderJump(params: Config.AuthenticationResult) {
    const { jumpUrl } = params;
    // TODO
    // const form = new FormComponent();
    // form.setProps({});

    // 表单模式 get 请求
    // form.submit("get", jumpUrl);

    // 表单模式 post 请求
    // form.submit("post", jumpUrl);

    // epg 跳转
    window.location.href = jumpUrl;
}

/**
 * 订购产品包选择跳转
 * @description 编写跳转产品包代码
 */
function orderProduct(params: Config.AuthenticationResult) {
    // TODO
    // window.location.href = "./product_package.html";
}

/**
 * 订购回调 
 * @description EPG 跳转、表单跳转、APK打开回调处理
 */
let OrderCallBack: Config.IOrderCallBack;

OrderCallBack = (backParams: Config.IBackParams) => {

    const { success, video_id, episode, from } = backParams;
    // 订购结果
    new Promise((resolve) => {

        if ("1" === success) {
            Authentication(video_id, Number(episode), this.nttMain.token, this.nttMain.global_variable.business_code, { from: "play" }).then((r) => {

                // play or trysee
                if (r.authStatus) {
                    resolve({ status: true, r });
                }
                // order
                else {
                    // 鉴权失败当做取消订购处理
                    resolve({ status: false });
                }
            });
        } else {
            resolve({ status: false });
        }
        resolve();
    }).then(({ status, r }) => {
        if (status) {

        //     // 播放回调处理方式
        //     Play({
        //         code: r.code,
        //         parentCode: r.parentCode,
        //         videoId: video_id,
        //         episode: Number(episode),
        //         playUrl: r.playUrl,
        //         trySee: r.trySee,
        //         seeSecond: r.seeSecond,
        //         continueSecond: r.continueSecond,
        //         from: from
        //     }, (method) => {
        //         return new Promise((resolve, rejects) => {
        //             // TODO
        //             // 行为上报
        //             resolve();
        //         });
        //     })
        // } else {
        //     // 播放回调处理方式
        //     this.source = new PageSource(new Cookie(`${ConfigBasic.mainCookieName}_play_source`));
        //     this.cokStatus = new Cookie(`${ConfigBasic.mainCookieName}_play_status`);

        //     let source: Play.ISource = Json.deSerializ(this.source.takeToLocal());

        //     this.source.removeToLocal();
        //     this.cokStatus.clearCookie();

        //     if (source) {
        //         const { url } = source;

        //         if ("-1" === url) {
        //             backLaunch();
        //         } else {
        //             window.location.href = url;
        //         }

        //     }
        }
    })
}

/**
 * APK 回调
 */
window['OrderCallBack'] = OrderCallBack;

export { Order, OrderCallBack }