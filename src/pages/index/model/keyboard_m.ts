import { MainEntity } from "src/entitys/main";

export class KeyboardModel {
    private nttMain: MainEntity;

    constructor(mainNtt: MainEntity) {
        this.nttMain = mainNtt;
    }

    getData() {
        return new Promise((resolve, reject) => {
            resolve({});
        });
    }
}