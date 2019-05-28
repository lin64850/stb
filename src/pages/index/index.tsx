import './index.less?raw';
import { BasePage, PageRegister } from 'stb-event';
import { render, h } from 'stb-react';
import Root from './containers/root/root';
import { MainData } from '../../../api';
import RootModel from './models/root_model';
import { Json, ParseUrl, PageSource } from 'stb-tools';
import { ConfigBasic } from '../../configs';
import { Cookie } from 'stb-cookie';

export const enum MType {
    Nav,
    Body,
    Control
}

class Page extends BasePage {
    load() {
        if (this.cokStatus.getCookie()) var memo: Index.IMemo = Json.deSerializ(this.cokStatus.getCookie());

        const store = new RootModel(null, this.request, memo);

        render(<Root event={this.event} store={store} />, document.getElementById('root'));

    }
    openBlank({ url, memo }) {
        if (memo) this.cokStatus.setCookie(Json.serializ(memo));
        else this.cokStatus.clearCookie();

        window.location.href = url;
    }
}

PageRegister(Page, {
    request: new ParseUrl(location.search).getDecodeURIComponent(),
    source: new PageSource(new Cookie(`${ConfigBasic.mainCookieName}_index_source`)),
    cokStatus: new Cookie(`${ConfigBasic.mainCookieName}_index_status`),
    debugSystem: true,
    debugOther: true
});