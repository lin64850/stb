import { Component, h } from "stb-react";
import { observer } from "mobx-stb";
import { MType } from "../..";
import { Key } from "stb-key";
import { focus } from "stb-decorator";
import { NavModel } from "../../models/nav_model";
import { PageType } from "stb-event";
import { FormatUrl } from "stb-tools";

@focus
@observer
export class Nav extends Component<Index.INavProps, Index.INavState>{

    store: NavModel = this.props.store;

    onEnter() {

        const item = this.store.dataList[this.index];
        const memo: Index.IMemo = { identCode: this.identCode, index: this.index };

        this.triggerGlobal(PageType.Blank, {
            url: new FormatUrl('./list.html', { back_url: new FormatUrl(window.location.href, {}).getEncodeURIComponent() }).getEncodeURIComponent(),
            memo
        });

    }

    onChange(status, keyCode) {
        if (!status) {
            if (Key.Down === keyCode) {
                this.target(MType.Body);
            }
            else if (Key.Right === keyCode) {
                this.target(MType.Control);
            }
        }
    }

    render() {
        return (
            <div class="nav">
                {
                    this.store.dataList.map((v, i) => {
                        return (
                            <div class="item" tag={i}>
                                <img class="def" />
                                <img class="act" />
                                <img class="foc" />
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}