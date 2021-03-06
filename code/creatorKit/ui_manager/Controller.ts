import { KClass } from "../js_decorator/JsDecorator";
import ControllerManager from "./ControllerManager";


/**
 * author: HePeiDong
 * date: 2019/9/13
 * name: 控制器基类
 * description: 控制器基类主要完成控制器里公共的底层功能，例如加载，显示，销毁，释放资源 
 */
@KClass
export abstract class Controller {
    private urls: string[];           //图集资源相对路劲
    private _loadedRes: boolean;          //资源是否加载了
    private _loadedView: boolean;         //预制体是否加载了
    private _assetArray: cc.SpriteAtlas[];//资源图集
    private _node: cc.Node;

    private _ctrlIndex: number;
    constructor() {
        this._loadedRes = false;
        this._loadedView = false;
    }

    public openView() {
        this.loadView();
    }

    public closeView() {
        ControllerManager.Instance.delView(this._ctrlIndex);
    }

    protected loadView(): void {}

    public get node(): cc.Node { return this._node; }

    protected setCtrlIndex(index: number): void {
        this._ctrlIndex = index;
    }

    public getCtrlIndex(): number { return this._ctrlIndex; }

    protected addClickEvent(target: cc.Node, caller: Controller, handler: Function, ...args: any[]): void {
        kit.TargetListener.listener(target, caller)
        .onStart(function() {})
        .onEnd(function(e: cc.Event.EventTouch) {
            if (utils.DateUtil.inCD(1000)) return;
            SAFE_CALLBACK(handler.bind(caller), e, ...args);
        });
    }

    /**具体控制器实现退出的方式，隐藏或者销毁 */
    abstract exitView(cleanup?: boolean): void;

    /***************控制器生命周期函数***************/
    /**试图加载完调用 */
    protected onViewLoaded(): void {}
    /**试图显示后调用 */
    protected onViewDidAppear(): void {}
    /**试图隐藏后调用 */
    protected onViewDidHide(): void {}
    /**试图销毁后调用 */
    protected onViewDidDisappear(): void {}

    protected getSpriteFrame(fileName: string): cc.SpriteFrame {
        if (this._assetArray && this._assetArray.length > 0) {
            let sf: cc.SpriteFrame;
            for (let i: number = 0; i < this._assetArray.length; ++i) {
                sf = this._assetArray[i].getSpriteFrame(fileName);
                if (sf) return sf;
            }
            return null;
        }
    }

    public hideView(): void {
        let action = cc.hide();
        this.node.runAction(action);
        this.onViewDidHide();
    }

    public showView(): void {
        let action = cc.show();
        this.node.runAction(action);
        this.onViewDidAppear();
    }

    public destroy(cleanup: boolean = true): void {
        this._loadedRes = false;
        this._loadedView = false;
        this._assetArray = null;
        this.node.stopAllActions();
        this.node.removeFromParent(cleanup);
        for (let url of this.urls) {
            let key: string = kit.Loader.makeKey(url, cc.SpriteAtlas);
            let res: kit.Resource = kit.PoolManager.Instance.getCurrentPool().getObject(key) as kit.Resource;
            SAFE_RELEASE(res);
        }
        this.node.destroy();
        this.onViewDidDisappear();
    }

    private loaded(): void {
        ControllerManager.Instance.addView(this);
        this._loadedView = true;
        let windHelper: kit.WindowHelper = this._node.getComponent(kit.WindowHelper);
        if (windHelper) {
            windHelper.setStartListener(() => this.onViewDidAppear());
        }
        else {
            this.onViewDidAppear();
        }
    }
}

