import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { PageModel } from "../model/page_m";
import { EpisodeControl } from "./episode_c";
import { MType } from "src/pages/play";
import { PlayControl } from "./play_c";
import { ProgressControl } from "./progress_c";
import { VolumeControl } from "./volume_c";
import { play, playFullPlayer, log, playPointFullPlayer, tips } from '../com_import';
import { Json } from '../../../framework/basic/json';
import { Order } from "@/config";
import { FormatUrl } from "stb/basic";

interface IPageControlProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageControl {
    public readonly props: IPageControlProps;
    public readonly conEpisode: EpisodeControl;
    public readonly conPlayCon: PlayControl;
    public readonly store: PageModel;
    public readonly conProgress: ProgressControl;
    public readonly conVolume: VolumeControl;

    constructor(parms: IPageControlProps) {
        this.props = parms;
        this.store = new PageModel(parms.nttMain);
        this.conEpisode = new EpisodeControl(this.store.episodeModule);
        this.conPlayCon = new PlayControl(this.store.modPlayCon);
        this.conProgress = new ProgressControl(this.store.modProgress)
        this.conVolume = new VolumeControl(this.store.modVolume)
    }

    initPage(): Promise<({ target })> {
        return new Promise((resolve) => {
            this.store.getData(this.props.requ.videoId).then(() => {
                const pageIndex = Math.ceil(Number(this.props.requ.episode) / 10);
                let seq = this.props.requ.episode
                // 下标
                let index = 0;
                if ((Number(this.props.requ.episode) <= 10)) {
                    index = Number(this.props.requ.episode) - 1;
                } else {
                    if (Number(this.props.requ.episode) % 10 == 0) {
                        index = 9
                    } else {
                        index = Number(this.props.requ.episode) % 10 - 1;
                    }
                }
                this.store.episodeModule.changeCondition(this.props.requ.videoId)
                this.conEpisode.initData({ pageIndex: pageIndex, startIndex: index }).then((list) => {
                    this.conProgress.initProgressView(list[index].title, { pageIndex, index, seq }).then(() => {
                        this.fullPlay(this.props.requ.videoId, this.props.requ.episode);
                        resolve({ target: MType.Page });
                    })
                })
            })
        });
    }


    fullPlay(video_id: string, episode: string) {
        this.store.getVideoAuth(
            video_id,
            Number(episode),
            new FormatUrl(new FormatUrl(window.location.href, {}).getURL().replace("play.html", 'handle_play_order.html'), {
                video_id: video_id,
                episode: episode,
            }).getEncodeURIComponent(),
        ).then((data: any) => {
            if (data.auth === 'success') {
                if (data.play_url && data.position != '0') {
                    playPointFullPlayer(data.play_url, Number(data.position));
                } else if (data.play_url) {
                    playFullPlayer(data.play_url);
                }
            } else if (data.auth === 'order') {
                let callBack = function (method) {
                    return new Promise((resolve) => {
                        resolve()
                    })
                };
                Order({
                    jumpUrl: data.jump_url,
                    productPackage: data.product_package,
                }, callBack);
            } else {
                tips(data);
            }
        })
    }
}