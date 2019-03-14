import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { BackgroundModel } from "../model/background_m";

interface IBackgroundControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class BackgroundControl {

    private readonly props: IBackgroundControlProps;

    private readonly store = new BackgroundModel();

    constructor(parms: IBackgroundControlProps) {
        this.props = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}