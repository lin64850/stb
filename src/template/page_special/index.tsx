/**
 * 编写作者:
 * 创建时间:
 */
import { BasePage, ReactDOM, PageRegister, PageSource, React } from "stb/component";
import { Json, SetTimeout, FormatUrl, ParseUrl } from "stb/basic";
import { initMain, Cookie } from "@/config";
import { PageModule } from "./view/page_v";
import { Config } from "src/config";
import { tips, log } from "./com_import";
import { PageControl } from "./control/page_c";

export enum MType {
    Page = -2,
    Content = -1
}
interface ISource {
    url: string;
}
export interface IOpenBlank {
    url: string;
    params: any;
    memo: IMemo;
    clear?: boolean
}
export interface IRequest {
    return: string;
    special_id: string;
    platform: string;
}
export interface IMemo {
    index: number;
}

export class PageDynamic extends BasePage<IRequest> {
    init() {
        // 启用来源地址持久化支持
        let source: ISource = {
            url: this.request.return || "./index.html"
        }
        this.source.saveToLocal(Json.serializ(source));
    }
    load() {
        // 启用界面恢复状态获取支持
        let memo: IMemo;
        if (this.cokStatus.getCookie()) {
            memo = Json.deSerializ(this.cokStatus.getCookie());
        }

        initMain().then((ntt) => {
            const con = new PageControl({ requ: this.request, nttMain: ntt, memo: memo });

            ReactDOM.render(<PageModule identCode={MType.Page} event={this.event} con={con} />, document.getElementById('page'));
        });

    }
    openBlank(data: IOpenBlank) {

        const { url, params, memo, clear } = data;

        // 启用界面恢复状态存储支持
        if (memo) {
            this.cokStatus.setCookie(Json.serializ(memo));
        }
        // 清空缓存
        if (clear) {
            // 清除cookie
            this.source.removeToLocal();
            this.cokStatus.clearCookie();
        }

        if (url) {

            // 直接跳转
            // window.location.href = url;

            // 兼容上报
            new SetTimeout(300).enable(() => {
                // 带参数以及返回地址
                window.location.href = new FormatUrl(url, {
                    ...params,
                    return: new FormatUrl("./dynamic_special.html", { /** 参数设置 */ }).getEncodeURIComponent()
                }).getEncodeURIComponent();
            });
        }

    }
    openPrevious(data) {
        let source: ISource = Json.deSerializ(this.source.takeToLocal());

        // 清除状态
        this.source.removeToLocal();
        this.cokStatus.clearCookie();

        if (source) {

            // 兼容上报
            new SetTimeout(300).enable(() => {
                // 启用返回功能支持
                if ("-1" === source.url) {

                } else {

                    // 指定页面
                    if (data) {
                        const { url, params } = data;

                        window.location.href = new FormatUrl(url, params).getEncodeURIComponent();
                    } else {
                        window.location.href = source.url;
                    }

                }
            });

        }
    }
}
let handlerDynamic = [MType.Page, MType.Content];
// 初始化一组组件
for (let i = 0; i < 50; i++) {
    handlerDynamic.push(i);
}
export { handlerDynamic }

// PageRegister(Page, {
//     handler: handlers,
//     request: new ParseUrl(location.search).getDecodeURIComponent(),
//     source: new PageSource(`${Config.mainCookieName}_dynamic_special_source`),
//     cokStatus: new Cookie(`${Config.mainCookieName}_dynamic_special_status`)
// });