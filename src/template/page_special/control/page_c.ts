import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { PageModel } from "../model/page_m";
import { tips, playSmallPlayer } from "../com_import";
import { ContentControl } from "./content_c";

interface IPageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageControl {

    private readonly props: IPageControlProps;

    public readonly store: PageModel;

    public readonly conContent: ContentControl;

    constructor(parms: IPageControlProps) {
        this.props = parms;
        this.store = new PageModel(parms);
        this.conContent = new ContentControl(this.store.modContent);
    }

    initPage(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.props.requ.special_id) {
                tips('not found special_id of params');
                resolve();
            } else {
                this.store.getData().then((data) => {
                    this.conContent.initData(data).then(() => {
                        resolve(data);
                    });
                });
            }
        });
    }

    getMemo() {
        return this.props.memo;
    }

    // 小窗播放
    play(video_id: number, episode: number) {

        // 鉴权// TODO
        this.store.getVideoAuth(`${video_id}`, episode, '').then((e) => {
            if (e.playUrl) {
                // 播放
                playSmallPlayer(e.playUrl);
            }
        })
    }

    // 全屏播放
    fullPlay(video_id: number, episode: number) {
        this.store.getVideoAuth(`${video_id}`, episode, '').then((e) => {
            // code: null,
            // parentCode: null,
            // playUrl: null,
            // authStatus: false,
            // trySee: false,
            // seeSecond: 0,
            // jumpUrl: null,
            // presentParams: null,
            // productPackage: null

        });
    }

}