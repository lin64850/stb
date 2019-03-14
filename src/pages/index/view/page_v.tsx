import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { KeyboardModule } from './keyboard_v';
import { TabModule } from "./tab_v";
import { ExpandModule } from './expand_v';

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
}

interface IPageState { }

export class PageModule extends React.Component<IPageProps, IPageState>{
    private readonly con = this.props.con;

    constructor(props: IPageProps) {
        super(props);
    }

    protected render() {
        return (
            <div class="content">
                <KeyboardModule identCode={MType.Keyboard} event={this.event} con={this.con} />
                <ExpandModule identCode={MType.Expand} event={this.event} con={this.con} />
                <TabModule event={this.event} con={this.con} />
            </div>
        )
    }

    protected componentDidMount() {
        if (this.con.props.memo) {
            const { key, index, pageType, keyword, pageIndex } = this.con.props.memo;
            if (pageType === 0) {
                this.con.initPage(index).then(() => {
                    this.target(key);
                })
            } else if (pageType === 1) {
                this.con.conKeyBoard.initData(keyword).then(() => {
                    this.con.initEmpty(index).then(() => {
                        this.target(key);
                    })
                })
            } else if (pageType === 2) {
                this.con.conKeyBoard.initData(keyword).then(() => {
                    this.con.initSearch({ pageIndex, keyword, index }).then(() => {
                        this.target(key);
                    })
                })
            }
        } else {
            this.con.initPage(0).then(() => {
                this.target(MType.Keyboard, { index: 4 });
            });
        }
    }
}