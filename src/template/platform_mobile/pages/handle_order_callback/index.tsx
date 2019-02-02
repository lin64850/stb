/**
 * 编写作者:
 * 创建时间:
 */
import { BasePage, ReactDOM, PageRegister, PageSource, React } from "stb/component";
import { ParseUrl } from "stb/basic";
import { Cookie } from "@/config";
import { Config } from "src/config";
import { tips, log } from "./com_import";

export const enum MType {
    Page
}

interface IRequest {
}

class Page extends BasePage<IRequest> {
    init(){

    }
    openBlank(){
        
    }
}

PageRegister(Page, {
    handler: [
        MType.Page
    ],
    request: new ParseUrl(location.search).getDecodeURIComponent(),
    source: new PageSource(`${Config.mainCookieName}_handle_authentication_callback_source`),
    cokStatus: new Cookie(`${Config.mainCookieName}_handle_authentication_callback_status`)
});