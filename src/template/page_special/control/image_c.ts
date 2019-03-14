import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { ImageModel } from "../model/image_m";

interface IImageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class ImageControl {

    private readonly props: IImageControlProps;

    private readonly store = new ImageModel();

    constructor(parms: IImageControlProps) {
        this.props = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}