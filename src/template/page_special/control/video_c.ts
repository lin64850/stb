import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { VideoModel } from "../model/video_m";

interface IVideoControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class VideoControl {

    private readonly props: IVideoControlProps;

    private readonly store = new VideoModel();

    constructor(parms: IVideoControlProps) {
        this.props = parms;
    }

    initData(): Promise<{ list }> {
        return new Promise((resolve, reject) => {
            resolve({ list: [] });
        });
    }
}