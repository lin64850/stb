import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { PageModel } from "../model/page";

interface IPageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageControl {

    private readonly props: IPageControlProps;

    private readonly store = new PageModel();

    constructor(parms: IPageControlProps) {
        this.props = parms;
    }

    initPage(): Promise<any> {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}