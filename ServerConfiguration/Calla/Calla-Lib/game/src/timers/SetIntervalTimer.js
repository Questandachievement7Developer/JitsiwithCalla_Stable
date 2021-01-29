﻿import { BaseTimer } from "./BaseTimer.js";

export class SetIntervalTimer extends BaseTimer {

    constructor(targetFrameRate) {
        super(targetFrameRate);
    }

    start() {
        this._timer = setInterval(
            () => this._onTick(performance.now()),
            this._frameTime);
    }

    stop() {
        if (this.isRunning) {
            this.clearInterval(this._timer);
            super.stop();
        }
    }

    get targetFrameRate() {
        return super.targetFrameRate;
    }

    set targetFrameRate(fps) {
        super.targetFrameRate = fps;
        if (this.isRunning) {
            this.restart();
        }
    }
}

