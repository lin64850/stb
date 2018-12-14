/**
 * 编写作者:
 * 创建时间:
 */
import { BasePage, PageRegister } from "../../framework/component/page";
import { ParseUrl } from "../../framework/basic/parseUrl";
import { PageSource } from "../../framework/component/pageSource";
import { Cookie } from "../../framework/basic/cookie";
import { ReactDOM } from "../../framework/component/react-dom";
import { PageModule } from "./com_page";
import { React } from "../../framework/component/react";
import { Config } from "../../config";

export const enum MType {
    Page
}

interface IRequest {
}

class Page extends BasePage<IRequest> {
    load() {
        ReactDOM.render(<PageModule identCode={MType.Page} event={this.event} />, document.getElementById('page'));
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