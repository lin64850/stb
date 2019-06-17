import { ParseUrl } from "stb-tools";
import { Cookie } from "stb-cookie";
import { ConfigBasic } from "./config.basic";

let getSourceAddress: Config.ISourceAddress;

/**
 * 情景一：EPG 站内跳转；带 return 参数
 * 情景二：EPG 第三方首次；带未知参数
 * 情景三：EPG 第三方 launcher 首次；带未知参数
 * 情景四：Launcher 首次加载；不带参数
 * 情景五：Launcher 首次加载；带未知参数
 * 情景六：EPG 封套；带 Cookie 存储值
 */
getSourceAddress = (href) => {
    let ret = "-1";

    if (href) {
        const request: any = new ParseUrl(href).getDecodeURIComponent();

        const { } = request;
        // 情景一
        if (request.return) {
            ret = request.return;
        }
        // TODO 
        // 处理其余场景
    }

    return ret;
}

function backLaunch() {
    // TODO
    // 返回 Launch
    window.close();
}

/**
 * 平台
 */
(function () {
    const request = new ParseUrl(window.location.href).getDecodeURIComponent();
    if (request.platform) {
        setPlatform(request.platform);
    } else if (request.platformId) {
        if (request.platformId == '2') {
            setPlatform('hw');
        } else {
            setPlatform('zte');
        }
    }
}())
function getPlatform(): string {
    const cok = new Cookie(`${ConfigBasic.mainCookieName}_platform`);
    let value = cok.getCookie();
    if (!value) {
        value = "hw";
    }
    return value;
}
function setPlatform(platform: string) {
    const cok = new Cookie(`${ConfigBasic.mainCookieName}_platform`);
    return cok.setCookie(platform);
}

/**
 * EPG 订购回调、EPG 播放回调未实现
 */

export {
    getSourceAddress,
    backLaunch,
    getPlatform,
    setPlatform
}