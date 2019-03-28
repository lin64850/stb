import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { DetailModule } from "./detail_v";
import { EpisodeModule } from "./episode_v";
import { TabModule } from "./tab_v";
import { RecommendModule } from './recommend_v';
import { Cookie } from "@/config";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}

interface IPageState { }

export class PageModule extends React.Component<IPageProps, IPageState>{
    readonly con = this.props.con;
    readonly mod = this.props.mod;

    constructor(props: IPageProps) {
        super(props);
    }

    render() {
    }

    componentDidMount() {
        this.con.initPage().then((target) => {
            this.target(target);
        });
    }
}