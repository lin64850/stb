/**
 * 编写作者:
 * 创建时间:
 */

import { BasePage, ReactDOM, PageRegister, PageSource, React } from "stb/component";
import { Json, SetTimeout, FormatUrl, ParseUrl } from "stb/basic";
import { initMain, Cookie } from "@/config";
import { PageModule } from "./com_page";
import { Config } from "src/config";

export const enum MType {
    Page
}

interface ISource {
    url: string;
}
export interface IOpenBlank {
    url: string;
    params: any;
    memo: IMemo;
}
export interface IRequest {
    return: string;
}
export interface IMemo {
    key: MType;
    index: number;
}

class Page extends BasePage<IRequest> {
    init() {
        // 启用来源地址持久化支持
        let source: ISource = {
            url: this.request.return || "-1"
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
            ReactDOM.render(<PageModule identCode={MType.Page} event={this.event} requ={this.request} memo={memo} nttMain={ntt} />, document.getElementById('page'));
        });

    }
    openBlank(data: IOpenBlank) {

        const { url, params, memo } = data;

        // 启用界面恢复状态存储支持
        if (memo) {
            this.cokStatus.setCookie(Json.serializ(memo));
        }

        if (url) {

            // 直接跳转
            // window.location.href = url;

            // 兼容上报
            new SetTimeout(300).enable(() => {
                // 带参数以及返回地址
                window.location.href = new FormatUrl(url, {
                    ...params,
                    return: new FormatUrl("./index.html", { /** 参数设置 */ }).getEncodeURIComponent()
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

PageRegister(Page, {
    handler: [
        MType.Page
    ],
    request: new ParseUrl(location.search).getDecodeURIComponent(),
    source: new PageSource(`${Config.mainCookieName}_index_source`),
    cokStatus: new Cookie(`${Config.mainCookieName}_index_status`)
});