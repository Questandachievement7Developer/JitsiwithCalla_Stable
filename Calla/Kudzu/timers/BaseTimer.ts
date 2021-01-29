import { TypedEventBase } from "../events/EventBase";
import { lerp } from "../math/lerp";

export class TimerTickEvent extends Event {
    t = 0;
    dt = 0;
    sdt = 0;
    constructor() {
        super("tick");
        Object.seal(this);
    }

    copy(evt: TimerTickEvent) {
        this.t = evt.t;
        this.dt = evt.dt;
        this.sdt = evt.sdt;
    }

    set(t: number, dt: number) {
        this.t = t;
        this.dt = dt;
        this.sdt = lerp(this.sdt, dt, 0.01);
    }
}

interface TimerEvents {
    stopped: Event,
    tick: TimerTickEvent;
}

export abstract class BaseTimer<TimerT> extends TypedEventBase<TimerEvents> {
    protected _timer: TimerT | null = null;
    protected _onTick: (t: number) => void;
    protected _frameTime = Number.MAX_VALUE;
    private _targetFPS = 0;

    constructor(targetFrameRate: number) {
        super();

        this.targetFrameRate = targetFrameRate;

        this._onTick = (t: number) => {
            const tickEvt = new TimerTickEvent();
            let lt = t;
            this._onTick = (t: number) => {
                if (t > lt) {
                    tickEvt.t = t;
                    tickEvt.dt = t - lt;
                    tickEvt.sdt = tickEvt.dt;
                    lt = t;
                    this._onTick = (t: number) => {
                        let dt = t - lt;

                        if (dt < -1000) {
                            lt = t - this._frameTime;
                            dt = this._frameTime;
                        }

                        if (dt > 0 && dt >= this._frameTime) {
                            tickEvt.set(t, dt);
                            lt = t;
                            this.dispatchEvent(tickEvt);
                        }
                    };
                }
            };
        };
    }

    restart() {
        this.stop();
        this.start();
    }

    get isRunning() {
        return this._timer != null;
    }

    abstract start(): void;

    stop() {
        this._timer = null;
        this.dispatchEvent(new Event("stopped"));
    }

    get targetFrameRate() {
        return this._targetFPS;
    }

    set targetFrameRate(fps: number) {
        this._targetFPS = fps;
        this._frameTime = 1000 / fps;
    }
}