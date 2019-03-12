import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { tabs } from "stb/decorator";

interface IContentProps {
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IContentState {
    display?: number;
}

@tabs('show', 'toggle', 1280, 720, 1)
export class ContentModule extends React.Component<IContentProps, IContentState>{
    private readonly con = this.props.con.conTen;
    private readonly mod = this.props.con.modTen;

    constructor(props: IContentProps) {
        super(props);
        this.state = {
        }
        this.con.initView = this.initView;
    }
    protected render() {
        return (

            <div tag="tab-group" >
                <div tag="tab" control="0">
                    {/* TODO Page One */}
                </div>

                <div tag="tab" control="1">
                    {/* TODO Page Two */}
                </div>

                <div tag="tab" control="2">
                    {/* TODO Page Three */}
                </div>
            </div>

        )
    }
    private initView = ({ dipslay }) => {

        this.setState({
            display: dipslay
        });

    };
}