import { IRequest, IMemo, MType } from "..";
import { MainEntity } from "src/entitys/main";

interface IPageModelProps { requ: IRequest, nttMain: MainEntity, memo: IMemo }

export class PageModel {
    private readonly initparams: IPageModelProps;
    public readonly nttMain: MainEntity;
    public readonly request: IRequest;

    constructor(parms: IPageModelProps) {
        this.initparams = parms;
        this.nttMain = this.initparams.nttMain;
        this.request = this.initparams.requ;
    }

    getMemo(): IMemo {
        return this.initparams.memo || {
            key: MType.Detail,
            episodeIndex: 0,
            episodePage: 1,
            tabIndex: 0,
            tabPage: 1,
            detailsIndex: 0,
            selectEpisode: 1,
        }
    }
}