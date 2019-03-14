import { CommonLogic } from "src/logics/common";

export class BackgroundModel {
    private readonly lgcCom = new CommonLogic();

    getData() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}