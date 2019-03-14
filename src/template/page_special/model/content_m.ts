import { CommonLogic } from "src/logics/common";

export class ContentModel {
    private readonly lgcCom = new CommonLogic();

    private background: string = '';
    private itemList: any[] = [];

    setData(bg,itemList){
        this.background = bg;
        this.itemList = itemList;
    }

    getBG(){
        return this.background;
    }

    getItemList(){
        return this.itemList;
    }

}