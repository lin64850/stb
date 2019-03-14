/**
 * 编写作者:
 * 创建时间:
 */
import { BasePage, ReactDOM, PageRegister, PageSource, React } from "stb/component";
import { Json, SetTimeout, FormatUrl, ParseUrl } from "stb/basic";
import { initMain, Cookie } from "@/config";
import { PageModule } from "./view/page_v";
import { Config } from "src/config";
import { tips, log, createPlayer, addPlay, releasePlayer, getCurrentTime } from './com_import';
import { PageControl } from "./control/page_c";

export const enum MType {
    Default,
    Progress,
    Volume,
    Page,
    MediaPlayer,
    Episode,
    PlayCon,
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
    videoId: string;
    episode: string;
}
export interface IMemo {
    key: MType;
    play: number;
}

class Page extends BasePage<IRequest> {
    init() {
        // 启用来源地址持久化支持
        let source: ISource = {
            url: this.request.return || "-1"
        }
        this.source.saveToLocal(Json.serializ(source));
        createPlayer(MType.MediaPlayer, this.event);
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
        const { url, params, memo } = data;
        // 启用界面恢复状态存储支持
        if (memo) {
            this.cokStatus.setCookie(Json.serializ(memo));
        }
        if (url) {
            new SetTimeout(300).enable(() => {
                if (params) {
                    // 带参数以及返回地址
                    window.location.href = new FormatUrl(url, {
                        ...params,
                        return: new FormatUrl(window.location.href, {/** 参数设置 */ }).getEncodeURIComponent(),
                    }).getEncodeURIComponent();
                } else {
                    // 直接跳转
                    window.location.href = url;
                }
            })
        }
    }

    openPrevious(data) {
        let source: ISource = Json.deSerializ(this.source.takeToLocal());
        // // 播放上报
        // addPlay(this.request.videoId, this.request.episode, getCurrentTime());
        // 清除状态
        this.source.removeToLocal();
        this.cokStatus.clearCookie();
        if (source) {
            // 兼容上报
            new SetTimeout(300).enable(() => {
                // 释放播放器
                releasePlayer();
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
        MType.Progress,
        MType.Volume,
        MType.Page,
        MType.MediaPlayer,
        MType.Episode,
        MType.PlayCon,
    ],
    request: new ParseUrl(location.search).getDecodeURIComponent(),
    source: new PageSource(`${Config.mainCookieName}_play_source`),
    cokStatus: new Cookie(`${Config.mainCookieName}_play_status`),
});