import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { PageModel } from "../model/page_m";
import { tips, log } from "../com_import";
import { IInitViewData, IInitViewMemo } from "../control/index_c";

interface IIndexProps {
    identCode: MType.Index;
    event: PageEvent;
    con: PageControl;
    mod: PageModel;
}
interface IIndexState {
}

export class IndexModule extends React.Component<IIndexProps, IIndexState>{
    readonly con = this.props.con.;
    readonly mod = this.props.con.;

    constructor(props: IIndexProps) {
        super(props);
        this.state = {
        }
        this.con.initView = this.initView;
    }
    render() {
        return (
            <div class="content">
                <span>Hello EPG!</span>
            </div>
        )
    }
    initView = (data: IInitViewData, memo: IInitViewMemo) => {
        console.log(`index initView`, data, memo);
    };
}