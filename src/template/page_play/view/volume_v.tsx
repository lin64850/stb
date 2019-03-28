import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log, play } from "../com_import";
import { Key, PlayerType } from "@/config";
import { SetTimeout } from "stb/basic";

interface IVolumeProps {
    identCode: MType.Volume;
    event: PageEvent;
    con: PageControl;
}

interface IVolumeState {
    display?: boolean
    currentVolume?: number;
    volumeStatus?: boolean
}

export class VolumeModule extends React.Component<IVolumeProps, IVolumeState>{
    readonly con = this.props.con;
    boxVoluTimer = new SetTimeout(3000);
    constructor(props: IVolumeProps) {
        super(props);
        this.state = {
            display: false,
            currentVolume: 0,
            volumeStatus: false,
        }
    }

    render() {
        return (
            <div class="content">
                <div class={this.state.display ? "volume" : "volume hide"} >
                    <span class={"icon-volume"} ></span>
                    <GridModule currentVolume={this.state.currentVolume} />
                    <span class="text">{this.state.currentVolume}</span>
                </div>
            </div>
        )
    }

    subscribeToEvents() {
        this.onfocus(() => {
            this.setState({
                display: true
            })
        })
        this.onblur(() => {
            this.setState({
                display: false
            })
        })
        this.onkeydown((e) => {
            if (e.keyCode === Key.Backspace) {
                this.onBackspace()
            }
            // 音量初始化
            this.event.on(MType.MediaPlayer, PlayerType.VolumeInit, (e: IVolumeInit) => {
                this.setState({
                    currentVolume: e.currentVolume,
                    display: !play.isMute()
                });
            });
            // 音量改变
            this.event.on(MType.MediaPlayer, PlayerType.VolumeChanging, (e: IVolumeChanging) => {
                // 延迟隐藏
                this.boxVoluTimer.enable(() => {
                    this.setState({
                        display: false
                    });
                });
                this.setState({
                    currentVolume: e.currentVolume,
                    display: true
                });
            });
            // 禁音
            this.event.on(MType.MediaPlayer, PlayerType.MuteVolume, () => {
                // 一直显示
                this.boxVoluTimer.clear();
                this.setState({
                    display: true,
                    volumeStatus: false
                });
            });
            // 恢复音量
            this.event.on(MType.MediaPlayer, PlayerType.ResumeVolume, () => {
                // 延迟隐藏
                this.boxVoluTimer.enable(() => {
                    this.setState({
                        display: false
                    });
                });
                this.setState({
                    volumeStatus: true,
                    display: true
                });
            });
            // 音量 +
            if (Key.VolumePlus === e.keyCode) {
                play.plusVolume(1);
            }
            // 音量 -
            else if (Key.VolumeMinus === e.keyCode) {
                play.minusVolume(1);
            }
        })
    }

    onBackspace() {
        this.target(MType.Page);
    }
}

function GridModule(props: { currentVolume }) {
    let per = this.props.currentVolume / 100;
    let rPer = Math.ceil(per * 20);
    // 根据音量设置状态
    let vs = [];
    for (let i = 0; i < 20; i++) {
        vs.push(i);
    }
    return (
        <div class="grid">
            {
                vs.map((v, i) => {
                    if (i < rPer) {
                        return (
                            <div class="full"></div>
                        );
                    } else {
                        return (
                            <div></div>
                        );
                    }
                })
            }
        </div>
    );
}