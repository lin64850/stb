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
    private readonly con = this.props.con;
    private readonly mod = this.props.mod;

    constructor(props: IPageProps) {
        super(props);
    }

    protected render() {
    }

    protected componentDidMount() {
        this.con.initPage().then((target) => {
            this.target(target);
        });
    }
}