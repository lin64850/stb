import { MainData } from "../../api";
import { FormatUrl } from "stb-tools";
import { getPlatform } from "./config.join";
import { Tools } from "./config.tool";

/**
 * 鉴权
*/
let Authentication: Config.IAuthentication;

Authentication = (videoId: string, episode: number, token: string, business: string, backParams: object) => {
    return new Promise((resolve, reject) => {

        let ret: Config.AuthenticationResult;

        // handler callback
        const notify = new FormatUrl(`${Tools.getPath()}/_order_callback.html`, backParams).getEncodeURIComponent();

        // new MainData().getAuthenticationData({
        //     business_code: business,
        //     token: token,
        //     video_id: videoId,
        //     seq: episode,
        //     platform: getPlatform(),
        //     sync_notify_url: notify,
        //     source: "auto"
        // }).then((res) => {
        //     if (res._response.data.status != 200) {
        //         resolve(ret);
        //         return;
        //     }
        //     if (res.data) {

        //         const { position, auth, post_api, try_see_second, code, parent_code, play_url, is_try_see } = res.data;

        //         ret = {
        //             code: code,
        //             parentCode: parent_code,
        //             playUrl: play_url,
        //             authStatus: auth === "success" ? true : false,
        //             trySee: is_try_see,
        //             seeSecond: Number(try_see_second),
        //             jumpUrl: null,
        //             presentParams: null,
        //             productPackage: null,
        //             continueSecond: Number(position)
        //         };

        //         if (auth === "success") {

        //             // continue play
        //             if (position && String(position).trim() && Number(position) > 0) {

        //             }

        //         } else if (auth === "order") {

        //             // try see
        //             if (res.data.is_try_see == true && res.data.try_see_second != "0") {
        //                 ret.trySee = true;
        //             }
        //             else if (res.data.is_try_see == false && Number(res.data.try_see_second) <= 0) {

        //             }

        //             // payment
        //             if (post_api) ret.jumpUrl = post_api;
        //         }

        //         resolve(ret);
        //     }
        // });

    });
}

export { Authentication }