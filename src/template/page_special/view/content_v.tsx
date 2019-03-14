import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { getDynamic } from "../com_dynamic";
import { getImageAddress } from "@/config/config.tool";

interface IContentProps {
    identCode: MType.Content;
    event: PageEvent;
    con: PageControl;
}
interface IContentState {
    list?: any[];
    background?: string;
}

export class ContentModule extends React.Component<IContentProps, IContentState>{
    private readonly con = this.props.con;

    constructor(props: IContentProps) {
        super(props);
        this.state = {
            list: [],
            background: ""
        }
        this.con.conContent.initContent = this.initView;
        this.con.conContent.switchBackground = this.switchBackground;
    }
    protected render() {
        return (
            <div>
                <img class="component-background" src={getImageAddress(this.state.background)} />
                {
                    this.state.list.map((v) => {

                        let Module: any = getDynamic(v);

                        return (<Module identCode={Number(v.seq)} event={this.event} ntt={v} con={this.con} />)
                    })
                }
            </div>
        )
    }
    private initView = (bg,item) => {
        return new Promise((resolve)=> {
            this.setState({
                background: bg,
                list: item
            });
            resolve();
        });
    }

    private switchBackground = (bg)=> {
        this.setState({
            background: bg
        });
    }
}