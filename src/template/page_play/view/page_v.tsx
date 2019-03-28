import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log, play, addPlay, getCurrentTime } from "../com_import";
import { EpisodeModule } from "./episode_v";
import { ProgressModule } from "./progress_v";
import { VolumeModule } from "./volume_v";
import { Key } from "@/config";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
}

interface IPageState { }

export class PageModule extends React.Component<IPageProps, IPageState>{
    readonly con = this.props.con;

    constructor(props: IPageProps) {
        super(props);
    }

    render() {
        return (
            <div class="content">
                <ProgressModule identCode={MType.Progress} event={this.event} con={this.props.con} />
                <VolumeModule identCode={MType.Volume} event={this.event} con={this.props.con} />
                <EpisodeModule event={this.event} identCode={MType.Episode} con={this.props.con} />
            </div>
        )
    }

    subscribeToEvents() {
        this.onkeydown((e) => {
            // 快进、快退激活进度条模块
            if (e.keyCode === Key.Down) {
                this.target(MType.Episode)
            } else if (e.keyCode === Key.VolumePlus || e.keyCode === Key.VolumeMinus) {
                this.target(MType.Volume)
            } else if (e.keyCode === Key.Enter) {
                if (!this.con.store.playStatus) {
                    this.con.store.setPlayStatus(!this.con.store.playStatus)
                    play.pause()
                } else {
                    this.con.store.setPlayStatus(!this.con.store.playStatus)
                    play.resume();
                }
                this.target(MType.Progress)
            } else if (e.keyCode === Key.Left || e.keyCode === Key.Right) {
                this.target(MType.Progress)
            } else if (Key.Backspace == e.keyCode) {
                // 播放上报
                addPlay(this.con.props.requ.videoId, this.con.store.episodeModule.dataList[this.props.con.conEpisode.currentIndex].seq, getCurrentTime());
                this.trigger(PageType.Previous)
            }
            // 向下激活选集模块//
        });
    }

    componentDidMount() {
        this.con.initPage().then(({ target }) => {
            this.target(target)
        });
    }
}