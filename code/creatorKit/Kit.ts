

/**
 * 游戏工具箱，定义游戏工具箱的接口类
 */

export function log(msg: any, ...subst: any[]){}
export function warn(msg: any, ...subst: any[]){}
export function Error(msg: any, ...subst: any[]){}
export function debug(msg: any, ...subst: any[]){}
export function info(msg: any, ...subst: any[]){}
export function LogID(id: number, ...subst: any[]){}
export function WarnID(id: number, ...subst: any[]){}
export function ErrorID(id: number, ...subst: any[]){}

export { Controller } from "./ui_manager/Controller";
export { WindowView } from "./ui_manager/WindowView";
export { LayerManager } from "./ui_manager/LayerManager";
export { EventListeners, Handler } from "./event_manager/EventListeners";
export { EventName } from "./event_manager/EventName";
export { AutoReleasePool, PoolManager } from "./res_manager/AutoReleasePool";
export { Loader } from "./res_manager/Loader";
export { Reference } from "./res_manager/Reference";
export { Resource } from "./res_manager/Resource";
export { PriorityQueue } from "./data_struct/PriorityQueue";
export { UserDefault } from "./data_manager/UserDefault";
export { Vector } from "./data_struct/Vector";
export { autoRelease } from "./res_manager/AutoRelease";
export { TargetListener } from "./event_manager/TargetListener";
export { GameFileManager } from "./data_manager/GameFileManager";
export { Animat } from "./effect_manager/AnimatManager";
export { Audio } from "./effect_manager/AudioManager";

export function animat(target: cc.Node) { return kit.Animat.create.target(target); }
export function audio(props: IAudio) { return kit.Audio.create.audio(props); }
export function event(target: cc.Node, caller: any) { return kit.TargetListener.listener(target, caller); }