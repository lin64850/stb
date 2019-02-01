import { ParseUrl } from "stb/basic";

let getSourceAddress: ISourceAddress;

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

/**
 * EPG 订购回调、EPG 播放回调未实现
 */

export {
    getSourceAddress
}