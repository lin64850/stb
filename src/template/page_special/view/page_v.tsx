import { React, PageEvent } from "stb/component";
import { MType } from "..";
import { PageControl } from "../control/page_c";
import { tips, log } from "../com_import";
import { ContentModule } from "./content_v";
import { SetTimeout } from "stb/basic";

interface IPageProps {
    identCode: MType.Page;
    event: PageEvent;
    con: PageControl;
}
interface IPageState {
}

export class PageModule extends React.Component<IPageProps, IPageState>{
    private readonly con = this.props.con;
    

    constructor(props: IPageProps) {
        super(props);
        this.state = {
        }
    }
    protected render() {
        return (
            <div class="content">
                <ContentModule identCode={MType.Content} event={this.event} con={this.props.con} />
            </div>
        )
    }
    protected componentDidMount() {
        this.con.initPage().then((data)=> {
            
            new SetTimeout(300).enable(() => {

                // 获取焦点
                let list = data.item, identCode = 0;
                
                for (const key in list) {
                    if (list.hasOwnProperty(key)) {
                        const ele = list[key];

                        if ("active" === ele.default_focus) {
                            identCode = Number(ele.seq);
                        }
                    }
                }

                if (undefined != this.con.getMemo()) {
                    identCode = this.con.getMemo().index;
                }

                this.target(Number(identCode));
            });
        });
    }
}