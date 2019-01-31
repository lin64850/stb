import { CommonLogic } from "src/logics/common";

export class PageModel {
    private readonly lgcCom = new CommonLogic();

    getData() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}