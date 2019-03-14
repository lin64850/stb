import { MainEntity } from "src/entitys/main";
import { AssetPackageLogic } from "src/logics/asset_package";
import { Dictionary } from "stb/conllection";

export class DefaultModel {
    private nttMain: MainEntity;
    private readonly lgc = new AssetPackageLogic();
    private readonly cache = new Dictionary;

    constructor(mainNtt: MainEntity) {
        this.nttMain = mainNtt;
    }

    getData() {
        return new Promise((resolve, reject) => {
            this.lgc.getAssetHotSearchRecom({
                page_number: '1',
                page_size: '4',
                business_code: this.nttMain.global_variable.business_code,
                package_key: '',
                token: this.nttMain.token,
            }, this.cache).then((data) => {
                if(data._success){
                    resolve(data.data.list);
                } else {
                    reject();
                }
            })
        });
    }
}