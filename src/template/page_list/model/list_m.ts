import { IRequest, IMemo } from "..";
import { MainEntity } from "src/entitys/main";
import { lgcCom, lgcAsst } from "../com_import";
import { Dictionary } from "stb/conllection";
import { WholePageControl } from "stb/controller";
import { Paging } from "stb/basic";

interface ICondition {

}

export class ListModel extends WholePageControl {
    /**
     * 分页对象（父类维护）
     */
    public readonly paging: Paging;

    /**
     * 数据源
     */
    private readonly lgcAsst = lgcAsst;

    /**
     * 主入口数据实体
     */
    private readonly nttMain: MainEntity;

    /**
     * 数据缓存
     */
    private cache = new Dictionary<AssetPackageEntity>();

    /**
     * 条件
     */
    private condition: ICondition;

    constructor(nttMain: MainEntity, size: number) {
        super(size);
        this.nttMain = nttMain;
    }
    /**
     * 某项数据
     * @param serial 为空取当前选中项
     */
    getItem(serial?): Promise<AssetPackageItemEntity> {
        return new Promise((resolve) => {
            let index = serial;

            if (undefined === index) index = this.index;

            this.getData(this.paging.getPageIndex())
            resolve(this.dataList[index]);
        });
    }
    /**
     * 设置条件
     * @param condition 坐标序号
     */
    setCondition(condition: ICondition) {
        this.condition = condition;
        this.paging.clear();
        this.cache.clear();
    }
    /**
     * 读取条件
     */
    getCondition(): ICondition {
        return this.condition;
    }
    protected getData(pageIndex: number): Promise<AssetPackageItemEntity[]> {
        return new Promise((resovle, reject) => {

            // 列表内容加载
            lgcAsst.getAssetVideoList({
                package_key: this.condition.package_key,
                item_package_id: this.condition.item_package_id,
                page_number: index,
                page_size: this.cuteRange,
                business_code: this.nttMain.global_variable.business_code,
                token: this.nttMain.token,
                ...this.condition
            }, this.cache).then((info) => {
                if (info._success) {

                    if (info.data) {
                        if (!this.paging.getDataSize()) {
                            this.paging.setDataSize(Number(info.data.total));
                        }

                        resovle(info.data.list);
                    } else {
                        resovle([]);
                    }
                }
            });

        });
    }
}