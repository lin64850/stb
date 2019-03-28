import { React, PageEvent, PageType } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log, play, addPlay, getCurrentTime } from "../com_import";
import { FuncLock, SetTimeout, Json } from "stb/basic";
import { PlayerType, Key } from "@/config";

interface IProgressProps {
    identCode: MType.Progress;
    event: PageEvent;
    con: PageControl;
}

interface IProgressState {
    display?: boolean;
    playStatus?: boolean;
    totalTime?: number;
    currentTime?: number;
    currentVolume?: number;
    title?: string
}

export class ProgressModule extends React.Component<IProgressProps, IProgressState>{
    readonly con = this.props.con;
    readonly conPro = this.props.con.conProgress;
    readonly playTools = new PlayTools()
    // 快件规则 间隔低于 500 ms 快进 10 间隔 1 s 内连续快进加 总进度的 60 分之 1
    funcLock = new FuncLock();
    timerProg = new SetTimeout(500);
    // 是否试看
    hasTry = false;
    orderurl = "";
    // 续播 秒
    position = 0;
    // play
    playMemory = { page: 1, index: 0, seq: 1 };
    boxProgTimer = new SetTimeout(3000);

    constructor(props: IProgressProps) {
        super(props);
        this.state = {
            display: false,
            playStatus: this.con.store.playStatus,
            totalTime: 0,
            currentTime: 0,
            currentVolume: 0,
            title: "",
        }
        this.conPro.initProgressView = this.initView;
    }

    render() {
        return (
            <div class="content">
                <div class={this.state.display ? "bottom" : "bottom hide"}>
                    {/* <!-- 暂停-播放（按钮）btn-play btn-pause --> */}
                    <div class={this.state.playStatus ? "btn-play" : "btn-pause"}></div>
                    <div class="progress-box" tag='focus'>
                        <span class="text-title">{this.state.title}</span>
                        <div class="progress-bg-bar"></div>
                        <div style={this.progressStyle()} class="progress-current-bar">
                            <div class="point"></div>
                        </div>
                        <div class="text-current-time">{this.playTools.FormatTime(this.state.currentTime, 'hh:mm:ss')}</div>
                        <div class="text-total-time">{this.playTools.FormatTime(this.state.totalTime, 'hh:mm:ss')}</div>
                    </div>
                </div>
            </div>
        )
    }

    subscribeToEvents() {
        this.onfocus((e) => {
            this.boxProgTimer.enable(() => {
                this.setState({
                    display: false
                });
                this.target(MType.Page)
            })
            this.setState({
                display: true
            })
        });
        this.onblur(() => {
            this.setState({
                display: false
            })
        });
        this.event.on(MType.MediaPlayer, PlayerType.StartPlaying, (e: IStartPlaying) => {
            // 延迟隐藏
            this.boxProgTimer.enable(() => {
                this.setState({
                    display: false
                });
                this.target(MType.Page)
            });
            this.target(MType.Progress);
            this.setState({
                display: true,
                playStatus: true
            });
        });
        // 进度改变
        this.event.on(MType.MediaPlayer, PlayerType.ProgressChanging, (e: IProgressChanging) => {
            this.setState({
                currentTime: e.currentTime
            });
        });
        // 总进度
        this.event.on(MType.MediaPlayer, PlayerType.TotalProgressInit, (e: ITotalProgressInit) => {
            this.setState({
                totalTime: e.totalTime
            })
        });
        // 暂停
        this.event.on(MType.MediaPlayer, PlayerType.PausePlaying, () => {
            // 一直显示
            this.boxProgTimer.clear();
            this.setState({
                playStatus: false,
                display: true
            });
        });
        // 恢复播放
        this.event.on(MType.MediaPlayer, PlayerType.ResumePlaying, () => {
            // 延迟隐藏
            this.boxProgTimer.enable(() => {
                this.setState({
                    display: false
                });
                this.target(MType.Page)
            })
            this.setState({
                playStatus: true,
                display: true
            });
        });
        // 播放完毕
        this.event.on(MType.MediaPlayer, PlayerType.FinishPlay, () => {
            // 播放上报
            addPlay(this.props.con.props.requ.videoId, this.con.store.episodeModule.dataList[this.props.con.conEpisode.currentIndex].seq, getCurrentTime());
            // 一直显示
            this.boxProgTimer.clear();
            this.setState({
                display: true
            })
            let videoType = this.props.con.store.videoDe.video_type
            if (this.hasTry) {
                const url = this.orderurl;
                this.trigger(PageType.Blank, { url: url });
            } else {
                // 电影播放完毕
                if ("1" === videoType) {
                    this.trigger(PageType.Previous);
                    return;
                }
                //剧集
                let pageIndex_p = this.con.store.episodeModule.paging.getPageIndex()
                let pageIndex_g = this.con.store.episodeModule.paging.getCountPage()
                let startIndex = this.playMemory.index + 1
                let video_id = this.con.store.videoId
                let dataList = this.con.store.episodeModule.dataList
                if (pageIndex_p < pageIndex_g) {
                    if (dataList[startIndex]) {
                        let title = dataList[startIndex].title
                        let seq = dataList[startIndex].seq
                        this.conPro.initProgressView(title, { pageIndex: pageIndex_p, index: startIndex, seq: seq }).then(() => {
                            this.props.con.conEpisode.setCurrentIndex(startIndex);
                            this.props.con.conEpisode.currentIndex = startIndex;
                            this.con.fullPlay(video_id, dataList[startIndex].seq)
                        })
                    } else {
                        this.con.conEpisode.initData({ pageIndex: pageIndex_p + 1, startIndex: 0 }).then((list) => {
                            let title = list[0].title;
                            let seq = list[0].seq;
                            this.conPro.initProgressView(title, { pageIndex: pageIndex_p, index: 0, seq: seq }).then(() => {
                                this.con.fullPlay(video_id, list[0].seq)
                            })
                        })
                    }
                } else {
                    if (dataList[startIndex]) {
                        let title = dataList[startIndex].title
                        let seq = dataList[startIndex].seq
                        this.conPro.initProgressView(title, { pageIndex: pageIndex_p, index: startIndex, seq: seq }).then(() => {
                            this.props.con.conEpisode.setCurrentIndex(startIndex);
                            this.props.con.conEpisode.currentIndex = startIndex;
                            this.con.fullPlay(video_id, dataList[startIndex].seq)
                        })
                    } else {
                        this.trigger(PageType.Previous);
                    }
                }
            }
        });
        this.onkeydown((e) => {
            if (Key.Right === e.keyCode) {
                // 延迟隐藏
                this.boxProgTimer.enable(() => {
                    this.setState({
                        display: false
                    });
                    this.target(MType.Page)
                })
                this.setState({
                    display: true
                });
                this.speed();
            }
            // 快退
            else if (Key.Left === e.keyCode) {
                // 延迟隐藏
                this.boxProgTimer.enable(() => {
                    this.setState({
                        display: false
                    });
                    this.target(MType.Page)
                })
                this.setState({
                    display: true
                });
                this.reverse();
            } else if (Key.Down === e.keyCode) {
                this.boxProgTimer.clear();
                this.setState({
                    display: false
                });
                this.target(MType.Episode);
            } else if (Key.Enter === e.keyCode) {
                this.boxProgTimer.enable(() => {
                    this.setState({
                        display: false
                    });
                    this.target(MType.Page)
                })
                this.setState({
                    display: true
                });
                if (this.con.store.playStatus) {
                    this.con.store.setPlayStatus(!this.con.store.playStatus)
                    this.setState({
                        playStatus: true,
                    })
                    play.resume();
                } else {
                    this.con.store.setPlayStatus(!this.con.store.playStatus)
                    this.setState({
                        playStatus: false,
                    })
                    play.pause();
                }
            } else if (Key.Backspace === e.keyCode) {
                this.boxProgTimer.clear();
                this.target(MType.Page);
            }
        })
    }

    private initView = (title, { pageIndex, index, seq }) => {
        return new Promise((resolve) => {
            this.playMemory.page = pageIndex
            this.playMemory.index = index
            this.playMemory.seq = seq
            this.setState({
                currentTime: 0,
                totalTime: 0,
                title: title
            })
            resolve();
        });
    }

    speed() {
        let val = 0;
        if (0 < this.state.totalTime) {
            this.funcLock.enable(() => {
                val = 5;
            }, () => {
                val = this.state.totalTime / 60;
            });
            this.timerProg.enable(() => {
                this.funcLock.clear();
            });
            play.speed(val);
        }
    }

    reverse() {
        let val = 0;
        if (0 < this.state.totalTime) {
            this.funcLock.enable(() => {
                val = 5;
            }, () => {
                val = this.state.totalTime / 60;
            });
            this.timerProg.enable(() => {
                this.funcLock.clear();
            });
            play.reverse(val);
        }
    }

    progressStyle() {
        let fullWidth = 938;
        if (this.state.totalTime) {
            let per = this.state.currentTime / this.state.totalTime;
            let rPer = per * fullWidth;
            return `width:${Math.round(rPer)}px`;
        }
        return "";
    }
}

class PlayTools {
    FormatTime(seconds: number, format?: string) {
        let hours: any, mins: any, secs: any;
        format = format || 'hh:mm:ss';
        hours = Math.floor(seconds / 3600);
        mins = Math.floor((seconds % 3600) / 60);
        secs = Math.floor((seconds % 3600) % 60);
        hours = hours < 10 ? ("0" + hours) : hours;
        mins = mins < 10 ? ("0" + mins) : mins;
        secs = secs < 10 ? ("0" + secs) : secs;
        return format.replace('hh', hours).replace('mm', mins).replace('ss', secs);
    }
}