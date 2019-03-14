import { EpisodeModel } from "./episode_m";
import { MainEntity } from "src/entitys/main";
import { PlayModel } from "./play_m";
import { ProgressModel } from "./progress_m";
import { VolumeModel } from "./volume_m";
import { Authentication } from "@/config";
import { VideoLogic } from "src/logics/video";
import { VideoDetailEntity } from "src/entitys/video";

export class PageModel {
    private readonly lgc = new VideoLogic();
    public readonly episodeModule: EpisodeModel;
    public readonly modPlayCon: PlayModel
    public readonly modProgress: ProgressModel
    public readonly modVolume: VolumeModel
    public playStatus: boolean = false
    public videoDe: VideoDetailEntity
    public videoId: string
    private readonly nttMain: MainEntity;

    constructor(mainNtt: MainEntity) {
        this.nttMain = mainNtt
        this.episodeModule = new EpisodeModel(10, mainNtt);
        this.modPlayCon = new PlayModel()
        this.modProgress = new ProgressModel()
        this.modVolume = new VolumeModel()
    }

    getData(video_id: string) {
        return new Promise((resolve, reject) => {
            this.lgc.getVideoDetail({
                video_id: video_id,
                token: this.nttMain.token,
                business_code: this.nttMain.global_variable.business_code
            }).then((info) => {
                this.videoDe = info.data
                this.videoId = video_id
                resolve({});
            })
        });
    }

    setPlayStatus(playStatus: boolean) {
        this.playStatus = playStatus
    }

    // 获取视频鉴权
    getVideoAuth(videoId: string, episode: number, syncNotifyUrl: string): Promise<AuthenticationResult> {
        return new Promise((resolve, reject) => {
            Authentication(videoId, episode, this.nttMain.token, this.nttMain.global_variable.business_code, syncNotifyUrl).then((ret) => {
                resolve(ret);
            });
        });
    }
}