import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { EpisodeModule } from "./episode_v";
import { focus } from "stb/decorator";
import { Key } from "@/config";
import { ProgressModule } from "./progress_v";
import { VolumeModule } from "./volume_v";

interface IPlayProps {
    identCode: MType.PlayCon;
    event: PageEvent;
    con: PageControl;
}

interface IPlayState {
    isShowEpisode?: boolean
}

export class PlayModule extends React.Component<IPlayProps, IPlayState>{
    readonly con = this.props.con.conPlayCon;

    constructor(props: IPlayProps) {
        super(props);
        this.state = {
            isShowEpisode: false,
        }
        this.con.initPlayConView = this.initView;
    }

    render() {
        return (
            <div class="content">
                <ProgressModule identCode={MType.Progress} event={this.event} con={this.props.con} />
                <VolumeModule identCode={MType.Volume} event={this.event} con={this.props.con} />
                <div style={{ display: this.state.isShowEpisode ? "block" : "none" }}>
                    <EpisodeModule event={this.event} identCode={MType.Episode} con={this.props.con} />
                </div>

            </div>
        )
    }

    initView = () => {
        return new Promise((resolve) => {
            resolve();
        });
    }

    subscribeToEvents() {
        this.onkeydown((e) => {
            if (e.keyCode === Key.Down) {
                this.setState({
                    isShowEpisode: true
                })
            }
        })
    }
}