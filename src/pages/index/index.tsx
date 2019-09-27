/**
 * 创建作者:
 * 创建时间:
 * 更新时间:
 */
import './index.less?raw';
import { BasePage, PageRegister } from 'stb-event';
import { render, h } from 'stb-react';
import { Root } from './containers/root/root';
import { MainData } from '../../api';
import { RootModel } from './models/root_model';
import { Json, ParseUrl, PageSource } from 'stb-tools';
import { ConfigBasic, Join } from '../../configs';
import { Cookie } from 'stb-cookie';

export const enum MType {
    Nav,
    Body,
    Control
}

class Page extends BasePage {
    private store: RootModel;

    init() {
        let source: Index.ISource = { url: this.request.back_url || "-1" };
        this.source.saveToLocal(Json.serializ(source));
    }
    load() {
        if (this.cokStatus.getCookie()) var memo: Index.IMemo = Json.deSerializ(this.cokStatus.getCookie());

        this.store = new RootModel(null, this.request, memo);

        render(<Root event={this.event} store={this.store} />, document.getElementById('root'));
    }
    openBlank({ url }) {
        const memo = this.store.getMemo(this.event.getTargetIdentCode());
        if (memo) this.cokStatus.setCookie(Json.serializ(memo));
        else this.cokStatus.clearCookie();

        window.location.href = url;
    }
    openPrevious() {
        let source: Index.ISource = Json.deSerializ(this.source.takeToLocal());

        this.source.removeToLocal();
        this.cokStatus.clearCookie();

        if (source) {
            const { url } = source;

            if ("-1" === url) {
                Join.backLaunch();
            } else {
                window.location.href = url;
            }
        }
    }
}

PageRegister(Page, {
    request: new ParseUrl(location.search).getDecodeURIComponent(),
    source: new PageSource(new Cookie(`${ConfigBasic.mainCookieName}_index_source`)),
    cokStatus: new Cookie(`${ConfigBasic.mainCookieName}_index_status`),
    debugSystem: false,
    debugOther: false
});