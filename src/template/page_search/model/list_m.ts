import { MainEntity } from "src/entitys/main";
import { WholePageControl } from "stb/controller";
import { AssetPackageLogic } from "src/logics/asset_package";
import { Paging } from "stb/basic";

export class ListModel extends WholePageControl {
    private nttMain: MainEntity;
    private readonly lgc = new AssetPackageLogic();
    private keyword: string;
    public paging: Paging;
    private realTotal: number;

    constructor(size, mainNtt: MainEntity) {
        super(size)
        this.nttMain = mainNtt;
    }

    getData(search): Promise<any> {
        let requst = (search) => {
            const pageSize = this.paging.getPageSize();
            const pageIndex = search;
            return new Promise((resolve, reject) => {
                this.lgc.getAssetVideoSearch({
                    business_code: this.nttMain.global_variable.business_code,
                    page_number: pageIndex,
                    page_size: pageSize,
                    package_key: '',
                    keyword: this.keyword,
                    token: this.nttMain.token,
                }).then((data) => {
                    if (data._success) {
                        if (data.data) {
                            const { list, total } = data.data;
                            this.paging.setDataSize(Number(total));
                            this.realTotal = Number(total) || 0;
                            resolve(list);
                        } else {
                            resolve([]);
                        }
                    } else {
                        reject();
                    }
                })
            });
        }
        // 预览
        return new Promise((resolve, reject) => {
            requst(search).then((list: any[]) => {
                if (this.paging.isNextPage()) {
                    requst(search + 1).then((list2) => {
                        resolve(list.concat(list2));
                    });
                } else {
                    resolve(list);
                }
            });
        });
    }

    setKeyword(keyword) {
        this.keyword = keyword;
    }
}