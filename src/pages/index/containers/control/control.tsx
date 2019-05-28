import { Component, h, props } from "stb-react";
import { MType } from "../..";
import { Key } from "stb-key";
import { PageType } from "stb-event";
import { focus } from "stb-decorator";

@focus
export class Control extends Component<Index.IControlProps, Index.IControlState>{

    onEnter({ value }) {
        const memo: Index.IMemo = { identCode: this.identCode, index: this.index };

        if (value) this.triggerGlobal(PageType.Blank, { url: value, memo });
    }

    onChange(status, keyCode) {
        if (!status) {
            if (Key.Left === keyCode) {
                this.target(MType.Nav);
            }
            else if (Key.Down === keyCode) {
                this.target(MType.Body);
            }
        }
    }

    render() {
        return (
            <div class="control">
                <div class="item" tag={0} {...props('./search.html')}>
                    {/* <img class="def" src={img_search} />
                    <img class="foc" src={img_btn_foc} /> */}
                </div>
                <div class="item t" tag={1} {...props('./record.html')}>
                    {/* <img class="def" src={img_center} />
                    <img class="foc" src={img_btn_foc} /> */}
                </div>
            </div>
        )
    }
}