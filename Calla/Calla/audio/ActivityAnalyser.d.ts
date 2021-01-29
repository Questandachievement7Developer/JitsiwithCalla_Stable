import { TypedEventBase } from "kudzu/events/EventBase";
import type { IDisposable } from "kudzu/using";
import { AudioActivityEvent } from "./AudioActivityEvent";
import type { AudioSource } from "./AudioSource";
interface AudioAnaylserEvents {
    audioActivity: AudioActivityEvent;
}
export declare class ActivityAnalyser extends TypedEventBase<AudioAnaylserEvents> implements IDisposable {
    private id;
    private bufferSize;
    private buffer;
    private wasActive;
    private activityCounter;
    private analyser;
    constructor(source: AudioSource, audioContext: AudioContext, bufferSize: number);
    dispose(): void;
    update(): void;
}
export {};
