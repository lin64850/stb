import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { IndexModel } from "../model/index";

interface IIndexControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class IndexControl {

    private readonly props: IIndexControlProps;

    private readonly store = new IndexModel();

    constructor(parms: IIndexControlProps) {
        this.props = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}